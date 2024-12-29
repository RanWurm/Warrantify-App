import pandas as pd
import numpy as np
from surprise import SVD, Reader, Dataset
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json

class HybridRecommender:
    def __init__(self):
        # Initialize the SVD model for collaborative filtering
        self.svd = SVD(
            n_factors=100,  # Number of latent factors
            n_epochs=20,    # Number of iterations
            lr_all=0.005,   # Learning rate
            reg_all=0.02    # Regularization
        )
        # Initialize TF-IDF for processing product titles
        self.vectorizer = TfidfVectorizer(min_df=1, stop_words='english')
        
    def load_data(self, json_data):
        """Load and prepare data from JSON format"""
        # Convert JSON to list of records
        records = []
        for line in json_data.split('\n'):
            if line.strip():  # Skip empty lines
                user_data = json.loads(line)
                user_id = user_data['user_id']
                # Extract each product rating
                for product in user_data['products']:
                    for rating in product['ratings']:
                        records.append({
                            'user_id': user_id,
                            'title': product['title'],
                            'rating': rating
                        })
        
        # Convert to DataFrame
        self.df = pd.DataFrame(records)
        print(f"Loaded {len(self.df)} ratings for {len(self.df['user_id'].unique())} users")
        
        # Create product feature vectors from titles
        unique_titles = self.df['title'].unique()
        self.title_vectors = self.vectorizer.fit_transform(unique_titles)
        self.title_similarity = cosine_similarity(self.title_vectors)
        self.title_to_index = {title: idx for idx, title in enumerate(unique_titles)}
        
        # Calculate global mean rating
        self.global_mean_rating = self.df['rating'].mean()
        
    def train(self):
        """Train the recommender system"""
        # Prepare data for SVD
        reader = Reader(rating_scale=(1, 5))
        data = Dataset.load_from_df(
            self.df[['user_id', 'title', 'rating']], 
            reader
        )
        trainset = data.build_full_trainset()
        
        # Train the SVD model
        print("Training SVD model...")
        self.svd.fit(trainset)
        print("Training completed!")
        
    def find_similar_products(self, product_title, n=5):
        """Find similar products based on title similarity"""
        if product_title not in self.title_to_index:
            return []
            
        idx = self.title_to_index[product_title]
        similarity_scores = self.title_similarity[idx]
        
        # Get similar products (excluding the input product)
        similar_indices = similarity_scores.argsort()[::-1][1:n+1]
        similar_products = []
        
        for idx in similar_indices:
            title = list(self.title_to_index.keys())[list(self.title_to_index.values()).index(idx)]
            score = similarity_scores[idx]
            similar_products.append((title, score))
            
        return similar_products
        
    def predict_rating(self, user_id, product_title, alpha=0.5):
        """Predict rating combining collaborative and content-based approaches"""
        try:
            # Try collaborative filtering prediction
            collab_pred = self.svd.predict(user_id, product_title).est
        except:
            # If user or item is unknown, use default
            collab_pred = self.global_mean_rating
            
        # Content-based prediction using product similarities
        user_ratings = self.df[self.df['user_id'] == user_id]
        
        if len(user_ratings) == 0:
            # New user - use average product rating
            content_pred = self.global_mean_rating
        else:
            # Find similar products the user has rated
            similar_ratings = []
            for _, row in user_ratings.iterrows():
                if product_title in self.title_to_index and row['title'] in self.title_to_index:
                    idx1 = self.title_to_index[product_title]
                    idx2 = self.title_to_index[row['title']]
                    similarity = self.title_similarity[idx1][idx2]
                    if similarity > 0:  # Only consider positive similarities
                        similar_ratings.append((similarity, row['rating']))
            
            if similar_ratings:
                # Weighted average of ratings based on similarity
                weights = np.array([s[0] for s in similar_ratings])
                ratings = np.array([s[1] for s in similar_ratings])
                
                # Check if weights sum to zero
                if weights.sum() > 0:
                    content_pred = np.average(ratings, weights=weights)
                else:
                    content_pred = self.global_mean_rating
            else:
                content_pred = self.global_mean_rating
        
        # Combine predictions
        return alpha * collab_pred + (1 - alpha) * content_pred
        
    def get_recommendations(self, user_id, n=5):
        """Get top N recommendations for a user"""
        all_products = self.df['title'].unique()
        predictions = []
        
        # Get products the user hasn't rated yet
        user_rated_products = set(self.df[self.df['user_id'] == user_id]['title'])
        unrated_products = [p for p in all_products if p not in user_rated_products]
        
        # Get predictions for unrated products
        for product in unrated_products:
            pred_rating = self.predict_rating(user_id, product)
            predictions.append((product, pred_rating))
        
        # Sort by predicted rating and return top N
        return sorted(predictions, key=lambda x: x[1], reverse=True)[:n]
__all__ = ['HybridRecommender']