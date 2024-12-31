from flask import Flask, request, jsonify
from flask_cors import CORS
from data_handler import load_products,analyze_recommendation_potential,remove_rows_with_missing,process_csv,count_rows_with_missing
from predict_algorithms.trie.generate_trie import load_trie
from predict_algorithms.products.testReccomender import load_and_test_recommender,load_csv_data_and_test_recommender


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load product data and initialize trie
folder_path = 'data_sets/words_prediction_datasets'
products = load_products(folder_path)
unique_prods = sorted(list(set(products)))
trie = load_trie(unique_prods)


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
    

    