from flask import Flask, request, jsonify
from flask_cors import CORS
from data_handler import load_products, analyze_recommendation_potential, remove_rows_with_missing, process_csv, count_rows_with_missing
from predict_algorithms.trie.generate_trie import load_trie
from predict_algorithms.products.testReccomender import load_and_test_recommender, load_csv_data_and_test_recommender
from predict_algorithms.products.productRecommender import ProductRecommender
import pandas as pd
from datetime import datetime, timedelta
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load product data and initialize trie
folder_path = 'data_sets/words_prediction_datasets'
products = load_products(folder_path)
unique_prods = sorted(list(set(products)))
trie = load_trie(unique_prods)


data_file_path = 'data_sets/recommendation_sys_datasets/data.csv'
df = pd.read_csv(data_file_path)
recommender = ProductRecommender()
recommender.fit(df)



@app.route('/autocomplete', methods=['GET'])
def autocomplete():
    query = request.args.get('query', '').lower()
    if not query:
        return jsonify([])
    
    # Get suggestions from trie
    suggestions = trie.autocomplete(query, max_suggestions=5)
    
    return jsonify(suggestions)

@app.route('/health', methods=['GET'])
def health():
    return "Python server is running!"

@app.route('/get_recommendation', methods=['GET'])
def get_recommendation():
    user_id = request.args.get('user_id', type=int)
    print(user_id)
    if user_id is None:
        return jsonify({'error': 'user_id is required'}), 400

    # Fetch user history from your recommender
    user_history = recommender.get_user_history(user_id)

    if not user_history:
        return jsonify({'message': 'No user history found'}), 200

    # Choose a random product from the user_history
    random_product = random.choice(user_history)
    random_viewed_product_id = random_product['product_id']

    # Get recommendations for this randomly chosen product
    recommendations = recommender.get_recommendations(random_viewed_product_id, n_recommendations=5)
    if not recommendations:
        return jsonify({'message': 'No recommendations found for the randomly chosen product'}), 200

    # Return the recommendations as a JSON response
    return jsonify({'recommendations': recommendations}), 200

    
@app.route('/get_warranties', methods=['GET'])
def get_warranties():
    user_id = request.args.get('user_id', type=int)
    print(user_id)
    if user_id is None:
        return jsonify({'error': 'user_id is required'}), 400
    
    # Filter events for the given user_id
    user_events = df[df['user_id'] == user_id]
    
    warranties = []
    today = datetime.now()
    
    for _, event in user_events.iterrows():
        # Extract last word from category_code
        category_code = event['category_code']
        title = category_code.split('.')[-1] if '.' in category_code else category_code
        
        # Subtitle is the brand
        subtitle = event['brand']
        
        # Generate a random date within the last year
        random_days = random.randint(0, 365)
        warranty_date = today - timedelta(days=random_days)
        date_str = warranty_date.strftime('%d/%m/%Y')
        
        # Calculate timeAgo
        days_diff = (today - warranty_date).days
        if days_diff < 30:
            timeAgo = f"{days_diff} days ago"
        elif days_diff < 365:
            months = days_diff // 30
            timeAgo = f"in {months} months" if random.choice([True, False]) else f"{months} months ago"
        else:
            years = days_diff // 365
            timeAgo = f"{years} year ago" if years == 1 else f"{years} years ago"
        
        # Icon name based on title (assuming iconName matches title)
        iconName = title.lower()
        if iconName == 'cartrige':
            iconName = 'printer'
        
        # Calculate progress percentage (0% to 100%)
        progress = (days_diff / 365) * 100
        progress = min(max(progress, 0), 100)  # Ensure progress is between 0 and 100
        
        warranty_item = {
            'title': title,
            'subtitle': subtitle,
            'date': date_str,
            'timeAgo': timeAgo,
            'iconName': iconName,
            'progress': progress,  # Represented as a percentage (0 to 100)
        }
        
        warranties.append(warranty_item)
    
    return jsonify({'warranties': warranties})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)


   ########################################## process the data sets to have a managable dataset ######################################################
   
   # 1) removed all 5+ years old data
   # 2) replace all of the products id with their real product name by crossing the data from reviews datasets and meta data
   # 3) remove uncessary fileds such as imgs videos texts and etc
   # 4) aggragate all the users so instead of each use will have x lines now for each user we have 1 row that contains all of products and their reviews
   # 5) removed all of the users with 1 review
   # 6) removed all of the products the purchesd only once
   # 7) we are ready for creating the matrix factorization / collaborati filltering model we are left with 96k dirrent useres and 72k diffrent items

    # fileds_to_remove = ["timestamp","parent_asin","asin"]
    # print('start to merge titles')
    # filter_large_jsonl_by_timestamp('data_sets/recommendation_sys_datasets/c.jsonl', 'data_sets/recommendation_sys_datasets/filterd_electronics_by_timestmp.jsonl')
    # process_large_jsonl_fields('data_sets/recommendation_sys_datasets/merged_files.jsonl','data_sets/recommendation_sys_datasets/a.jsonl',fileds_to_remove)
    # merge_titles('data_sets/recommendation_sys_datasets/filterd_electronics_reviews_text.jsonl','data_sets/recommendation_sys_datasets/filtered_meta_electronics.jsonl','data_sets/recommendation_sys_datasets/merged_files.jsonl')
    # count_distinct_fields('data_sets/recommendation_sys_datasets/c.jsonl','title')
    # count_distinct_titles('data_sets/recommendation_sys_datasets/e.jsonl')
    # filter_large_jsonl('data_sets/recommendation_sys_datasets/d.jsonl','data_sets/recommendation_sys_datasets/e.jsonl')
    # aggregate_user_product_ratings('data_sets/recommendation_sys_datasets/a.jsonl','data_sets/recommendation_sys_datasets/c.jsonl')
    # print('filter the meta_electronics is done')
    
    ## note this is'nt the full data processing that occoured , i've deleted many many parts in the process
    
   ####################################################################################################################################################
    #csv_input_path = 'data_sets/recommendation_sys_datasets/events.csv'
    #missing_rows_csv_output_path = 'data_sets/recommendation_sys_datasets/data_with_missing_rows.csv'
    #csv_output_path = 'data_sets/recommendation_sys_datasets/data.csv'
    # process_csv(csv_input_path,missing_rows_csv_output_path)
    # remove_rows_with_missing(missing_rows_csv_output_path,csv_output_path)
   
    
    
    #analyze_recommendation_potential(csv_output_path)
    # recommender = load_and_test_recommender(path, sample_size=1000)
    #load_csv_data_and_test_recommender(csv_output_path)
    

    