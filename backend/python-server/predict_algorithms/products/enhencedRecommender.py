from surprise import SVD, Reader, Dataset
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json
import pandas as pd
import numpy as np

class EnhancedRecommender:
    def __init__(self):
        self.svd = SVD(n_factors=100, n_epochs=20, lr_all=0.005, reg_all=0.02)
        self.vectorizer = TfidfVectorizer(min_df=1, stop_words='english')
        
    def load_data(self, json_data):
        """Load and prepare data from simplified JSONL format"""
        records = []
        for line in json_data.split('\n'):
            if line.strip():
                user_data = json.loads(line)
                user_id = user_data['user_id']
                for product in user_data['products']:
                    records.append({
                        'user_id': user_id,
                        'title': product['title'],
                        'rating': product['ratings'][0]  # Using first rating
                    })
        
        self.df = pd.DataFrame(records)
        self._prepare_content_features()
        self.global_mean_rating = self.df['rating'].mean()
        
    def _prepare_content_features(self):
        """Prepare content-based features from simplified titles"""
        unique_titles = self.df['title'].unique()
        self.title_vectors = self.vectorizer.fit_transform(unique_titles)
        self.title_similarity = cosine_similarity(self.title_vectors)
        self.title_to_index = {title: idx for idx, title in enumerate(unique_titles)}
        
    def get_product_category(self, title):
        """Extract main product category from simplified title"""
        words = title.lower().split()
        return words[-1] if words else None  # Last word is the product type
        
    def get_recommendations(self, user_id, n=5):
        """Get recommendations avoiding categories user already owns"""
        all_products = self.df['title'].unique()
        
        # Get user's owned categories
        user_products = self.df[self.df['user_id'] == user_id]['title']
        owned_categories = {self.get_product_category(title) for title in user_products}
        
        # Filter unrated products
        user_rated = set(user_products)
        unrated_products = [p for p in all_products if p not in user_rated 
                          and self.get_product_category(p) not in owned_categories]
        
        predictions = [
            (product, self.predict_rating(user_id, product))
            for product in unrated_products
        ]
        
        return sorted(predictions, key=lambda x: x[1], reverse=True)[:n]
        
    def predict_rating(self, user_id, product_title, alpha=0.5):
        """Hybrid prediction combining collaborative and content-based"""
        try:
            collab_pred = self.svd.predict(user_id, product_title).est
        except:
            collab_pred = self.global_mean_rating
            
        content_pred = self._get_content_based_prediction(user_id, product_title)
        return alpha * collab_pred + (1 - alpha) * content_pred
        
    def _get_content_based_prediction(self, user_id, product_title):
        """Content-based prediction using product similarities"""
        user_ratings = self.df[self.df['user_id'] == user_id]
        
        if len(user_ratings) == 0 or product_title not in self.title_to_index:
            return self.global_mean_rating
            
        similar_ratings = []
        prod_idx = self.title_to_index[product_title]
        
        for _, row in user_ratings.iterrows():
            if row['title'] in self.title_to_index:
                idx = self.title_to_index[row['title']]
                similarity = self.title_similarity[prod_idx][idx]
                if similarity > 0:
                    similar_ratings.append((similarity, row['rating']))
        
        if not similar_ratings:
            return self.global_mean_rating
            
        weights = np.array([s[0] for s in similar_ratings])
        ratings = np.array([s[1] for s in similar_ratings])
        
        return np.average(ratings, weights=weights) if weights.sum() > 0 else self.global_mean_rating
        
    def train(self):
        """Train the collaborative filtering model"""
        reader = Reader(rating_scale=(1, 5))
        data = Dataset.load_from_df(self.df[['user_id', 'title', 'rating']], reader)
        trainset = data.build_full_trainset()
        self.svd.fit(trainset)