import json
import pandas as pd
from .hybridReccomender import HybridRecommender
from .enhencedRecommender import EnhancedRecommender
from .productRecommender import ProductRecommender
import datetime
import numpy as np

def load_and_test_recommender(jsonl_path, sample_size=None):
    """
    Load data from JSONL file and test the recommender system
    
    Args:
        jsonl_path (str): Path to the JSONL file
        sample_size (int, optional): Number of users to sample for testing
    """
    # Read JSONL file and combine into a single string for the recommender
    print("Loading data...")
    all_data = []
    with open(jsonl_path, 'r', encoding='utf-8') as f:
        for line in f:
            if line.strip():
                all_data.append(line.strip())
    
    if sample_size:
        # Randomly sample users if sample_size is specified
        import random
        all_data = random.sample(all_data, min(sample_size, len(all_data)))
    
    combined_data = '\n'.join(all_data)
    
    # Initialize and train recommender
    print("Initializing recommender system...")
    recommender = EnhancedRecommender()  # Updated class name
    recommender.load_data(combined_data)
    
    print("\nStarting training...")
    recommender.train()
    
    # Get some statistics
    n_users = len(recommender.df['user_id'].unique())
    n_products = len(recommender.df['title'].unique())
    n_ratings = len(recommender.df)
    
    print(f"\nDataset statistics:")
    print(f"Number of users: {n_users}")
    print(f"Number of unique products: {n_products}")
    print(f"Total number of ratings: {n_ratings}")
    print(f"Average ratings per user: {n_ratings/n_users:.2f}")
    
    # Test recommendations for a few random users
    print("\nTesting recommendations for 3 random users:")
    random_users = recommender.df['user_id'].sample(3).tolist()
    
    for user_id in random_users:
        print(f"\nRecommendations for user {user_id}:")
        # Get user's current ratings
        user_ratings = recommender.df[recommender.df['user_id'] == user_id]
        print("Current ratings:")
        for _, row in user_ratings.head(3).iterrows():
            print(f"- {row['title']}: {row['rating']}")
            
        # Get recommendations
        recommendations = recommender.get_recommendations(user_id, n=5)
        print("\nTop 5 recommendations:")
        for product, score in recommendations:
            print(f"- {product}: {score:.2f}")
            
        # Get similar products for the user's highest-rated item
        # if not user_ratings.empty:
        #     top_rated = user_ratings.loc[user_ratings['rating'].idxmax(), 'title']
        #     print(f"\nSimilar products to user's highest-rated item ({top_rated}):")
        #     similar_products = recommender.find_similar_products(top_rated, n=3)
        #     for product, similarity in similar_products:
        #         print(f"- {product}: {similarity:.2f}")
    
    return recommender

def load_and_prepare_data(file_path):
    """Load and prepare the dataset."""
    df = pd.read_csv(file_path)
    return df

def print_product_list(products, title):
    """Helper function to print products in a formatted way."""
    print(f"\n{title}")
    print("-" * 80)
    for i, product in enumerate(products, 1):
        print(f"{i}. Product ID: {product['product_id']}")
        print(f"   Category ID: {product['category_id']}")
        print(f"   Category Code: {product['category_code']}")
        print(f"   Brand: {product['brand']}")
        if 'similarity_score' in product:
            print(f"   Similarity Score: {product['similarity_score']:.3f}")
        print()




def load_csv_data_and_test_recommender(csv_path, sample_size=None, test_size=0.2):
    # Load the data
    df = pd.read_csv(csv_path)
    
    # Initialize and train the recommender
    recommender = ProductRecommender()
    recommender.fit(df)
    
    # Get a sample user_id
    test_user_id = df['user_id'].iloc[0]
    
    # Get and print user history
    user_history = recommender.get_user_history(test_user_id)
    print_product_list(user_history, f"Viewing History for User {test_user_id}")
    
    # Get and print recommendations based on the last viewed product
    last_viewed_product = user_history[-1]['product_id']
    recommendations = recommender.get_recommendations(last_viewed_product, n_recommendations=5)
    print_product_list(recommendations, f"Top 5 Recommendations based on last viewed product {last_viewed_product}")