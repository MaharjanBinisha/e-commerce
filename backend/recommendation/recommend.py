
#working for now code()
# from flask import Flask, request, jsonify
# import numpy as np
# import pandas as pd
# import faiss
# from sklearn.feature_extraction.text import TfidfVectorizer
# from pymongo import MongoClient
# from bson import ObjectId
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app, origins=["http://localhost:5173"], supports_credentials=True)# Connect to MongoDB
# client = MongoClient("mongodb+srv://binisha:binisha7613@cluster0.he1e0.mongodb.net")
# db = client["e-commerce"]
# products_collection = db["products"]
# interactions_collection = db["interactions"]

# # Function to load products
# # Function to load products
# def load_products():
#     products = list(products_collection.find({}, {"_id": 1, "name": 1, "category": 1, "description": 1, "image": 1}))  # Include 'image'
#     for product in products:
#         product["id"] = str(product["_id"])
#         del product["_id"]
#     return pd.DataFrame(products)


# vectorizer = TfidfVectorizer()

# def build_faiss_index(df):
#     tfidf_matrix = vectorizer.fit_transform(df["description"])
#     tfidf_array = tfidf_matrix.toarray().astype(np.float32)

#     faiss.normalize_L2(tfidf_array)  # Normalize for cosine similarity
#     index = faiss.IndexFlatIP(tfidf_array.shape[1])  # Inner product (cosine similarity)
#     index.add(tfidf_array)

#     return index

# def precision_at_k(recommended_ids, actual_interacted_ids, k):
#     recommended_k = recommended_ids[:k]  
#     relevant_items = set(recommended_k) & set(actual_interacted_ids)  
#     return len(relevant_items) / k if k > 0 else 0  



# @app.route('/recommend', methods=['POST'])
# def recommend():
#     df = load_products()  # Reload product data
#     index = build_faiss_index(df)  # Rebuild FAISS index dynamically

#     data = request.json
#     user_id = data.get("user_id")

#     try:
#         user_id = ObjectId(user_id)
#     except:
#         return jsonify({"error": "Invalid user_id format"}), 400

#     interactions = list(interactions_collection.find({"userId": user_id}))

#     if not interactions:
#         return jsonify({"error": "No interactions found for this user"}), 404

#     # Get the latest interactions dynamically
#     interacted_product_ids = [
#         str(item["_id"]) for interaction in interactions if "items" in interaction for item in interaction["items"]
#     ]

#     interacted_categories = set(df[df["id"].isin(interacted_product_ids)]["category"].tolist())

#     product_descs = df[df["id"].isin(interacted_product_ids)]["description"].tolist()

#     if not product_descs:
#         return jsonify({"error": "No descriptions found for interacted products"}), 404

#     product_vectors = vectorizer.transform(product_descs).toarray().astype(np.float32)

#     # Use the latest interaction for recommendations
#     query_vector = product_vectors[-1].reshape(1, -1) if len(product_vectors) > 1 else product_vectors

#     faiss.normalize_L2(query_vector)
#     D, I = index.search(query_vector, 10)

#     recommended_products = []
#     for indices in I:
#         for idx in indices:
#             if idx < len(df):
#                 product = df.iloc[idx].to_dict()
#                 if product["category"] in interacted_categories or len(recommended_products) < 10:
#                     recommended_products.append(product)

#     recommended_products = list({p["id"]: p for p in recommended_products}.values())[:10]

#     precision = precision_at_k([p["id"] for p in recommended_products], interacted_product_ids, 5)

#     return jsonify({"recommended_products": recommended_products, "precision@5": precision})




# #imp working rec code
# @app.route('/recommend', methods=['POST'])
# def recommend():
#     df = load_products()  # Reload product data with images
#     index = build_faiss_index(df)  # Rebuild FAISS index dynamically

#     data = request.json
#     user_id = data.get("user_id")

#     try:
#         user_id = ObjectId(user_id)
#     except:
#         return jsonify({"error": "Invalid user_id format"}), 400

#     interactions = list(interactions_collection.find({"userId": user_id}))

#     if not interactions:
#         return jsonify({"error": "No interactions found for this user"}), 404

#     interacted_product_ids = [
#         str(item["_id"]) for interaction in interactions if "items" in interaction for item in interaction["items"]
#     ]

#     interacted_categories = set(df[df["id"].isin(interacted_product_ids)]["category"].tolist())

#     product_descs = df[df["id"].isin(interacted_product_ids)]["description"].tolist()

#     if not product_descs:
#         return jsonify({"error": "No descriptions found for interacted products"}), 404

#     product_vectors = vectorizer.transform(product_descs).toarray().astype(np.float32)

#     # Create a query vector by averaging all interacted product vectors
#     if len(product_vectors) > 0:
#         query_vector = np.mean(product_vectors, axis=0).reshape(1, -1)
#     else:
#         return jsonify({"error": "No product vectors found for interacted products"}), 404

#     faiss.normalize_L2(query_vector)
#     D, I = index.search(query_vector, 10)

#     recommended_products = []
#     for indices in I:
#         for idx in indices:
#             if idx < len(df):
#                 product = df.iloc[idx].to_dict()
#                 recommended_products.append(product)

#     # Remove duplicates and limit to 10
#     recommended_products = list({p["id"]: p for p in recommended_products}.values())[:10]

#     precision = precision_at_k([p["id"] for p in recommended_products], interacted_product_ids, 5)

#     return jsonify({"recommended_products": recommended_products, "precision@5": precision})
# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001, debug=True)

from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import faiss
from sklearn.feature_extraction.text import TfidfVectorizer
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173","https://idyllic-gecko-d3f210.netlify.app"], supports_credentials=True)

# Connect to MongoDB
client = MongoClient("mongodb+srv://binisha:binisha7613@cluster0.he1e0.mongodb.net")
db = client["e-commerce"]
products_collection = db["products"]
interactions_collection = db["interactions"]

# Load all products from MongoDB
def load_products():
    products = list(products_collection.find({}, {"_id": 1, "name": 1, "category": 1, "description": 1, "image": 1, "price":1, "subCategory":1}))  
    for product in products:
        product["id"] = str(product["_id"])
        del product["_id"]
    return pd.DataFrame(products)

# Initialize global FAISS index
vectorizer = TfidfVectorizer()
index = None
df_products = load_products()

def build_faiss_index(df):
    global index
    tfidf_matrix = vectorizer.fit_transform(df["description"])
    tfidf_array = tfidf_matrix.toarray().astype(np.float32)
    
    faiss.normalize_L2(tfidf_array)  # Normalize for cosine similarity
    index = faiss.IndexFlatIP(tfidf_array.shape[1])  # Inner product (cosine similarity)
    index.add(tfidf_array)

# Build FAISS index at startup
build_faiss_index(df_products)

# # Function to compute precision@k
# def precision_at_k(recommended_ids, actual_interacted_ids, k):
#     recommended_k = recommended_ids[:k]  
#     relevant_items = set(recommended_k) & set(actual_interacted_ids)  
#     return len(relevant_items) / k if k > 0 else 0  

# # Function to compute recall@k
# def recall_at_k(recommended_ids, actual_interacted_ids, k):
#     recommended_k = recommended_ids[:k]
#     relevant_items = set(recommended_k) & set(actual_interacted_ids)
#     return len(relevant_items) / len(actual_interacted_ids) if actual_interacted_ids else 0

# # Function to compute F1@k
# def f1_score_at_k(precision, recall):
#     return 2 * (precision * recall) / (precision + recall) if (precision + recall) > 0 else 0

# Function to compute category-based precision@k
def precision_at_k(recommended_ids, actual_interacted_ids, k):
    recommended_k = recommended_ids[:k]
    
    recommended_categories = set(
        df_products[df_products["id"].isin(recommended_k)]["category"]
    )
    interacted_categories = set(
        df_products[df_products["id"].isin(actual_interacted_ids)]["category"]
    )
    relevant_items = recommended_categories & interacted_categories
    return len(relevant_items) / len(recommended_categories) if recommended_categories else 0

# Function to compute category-based recall@k
def recall_at_k(recommended_ids, actual_interacted_ids, k):
    recommended_k = recommended_ids[:k]
    
    recommended_categories = set(
        df_products[df_products["id"].isin(recommended_k)]["category"]
    )
    interacted_categories = set(
        df_products[df_products["id"].isin(actual_interacted_ids)]["category"]
    )
    relevant_items = recommended_categories & interacted_categories
    return len(relevant_items) / len(interacted_categories) if interacted_categories else 0

# Function to compute F1@k
def f1_score_at_k(precision, recall):
    return 2 * (precision * recall) / (precision + recall) if (precision + recall) > 0 else 0

# Update FAISS index when a new interaction occurs
def update_faiss_index():
    global df_products, index
    df_products = load_products()  # Reload products
    build_faiss_index(df_products)  # Rebuild FAISS index

@app.route('/recommend', methods=['POST'])
def recommend():
    global df_products, index
    data = request.json
    user_id = data.get("user_id")

    try:
        user_id = ObjectId(user_id)
    except:
        return jsonify({"error": "Invalid user_id format"}), 400

    # Fetch user's recent interactions (only last 5 interactions)
    interactions = list(interactions_collection.find({"userId": user_id}).sort("timestamp", -1).limit(2))

    if not interactions:
        return jsonify({"error": "No recent interactions found for this user"}), 404

    interacted_product_ids = [
        str(item["_id"]) for interaction in interactions if "items" in interaction for item in interaction["items"]
    ]

    # Get product descriptions for interacted items
    product_descs = df_products[df_products["id"].isin(interacted_product_ids)]["description"].tolist()

    if not product_descs:
        return jsonify({"error": "No descriptions found for interacted products"}), 404

    # Transform user interaction descriptions into a query vector
    product_vectors = vectorizer.transform(product_descs).toarray().astype(np.float32)

    if len(product_vectors) > 0:
        query_vector = np.mean(product_vectors, axis=0).reshape(1, -1)
    else:
        return jsonify({"error": "No valid query vector"}, 404)

    faiss.normalize_L2(query_vector)
    D, I = index.search(query_vector, 10)

    recommended_products = []
    for indices in I:
        for idx in indices:
            if idx < len(df_products):
                product = df_products.iloc[idx].to_dict()
                recommended_products.append(product)

    recommended_products = list({p["id"]: p for p in recommended_products}.values())[:10]

    # precision = precision_at_k([p["id"] for p in recommended_products], interacted_product_ids, 10)

    # return jsonify({"recommended_products": recommended_products, "precision@10": precision})
    recommended_ids = [p["id"] for p in recommended_products]
    precision = precision_at_k(recommended_ids, interacted_product_ids, 10)
    recall = recall_at_k(recommended_ids, interacted_product_ids, 10)
    f1 = f1_score_at_k(precision, recall)

    return jsonify({
        "recommended_products": recommended_products,
        "precision@10": precision,
        "recall@10": recall,
        "f1@10": f1
    })

   
@app.route('/interaction', methods=['POST'])
def log_interaction():
    data = request.json
    user_id = data.get("user_id")
    product_id = data.get("product_id")

    try:
        user_id = ObjectId(user_id)
        product_id = ObjectId(product_id)
    except:
        return jsonify({"error": "Invalid ID format"}), 400

    interaction_data = {
        "userId": user_id,
        "items": [{"_id": product_id}],
        "timestamp": pd.Timestamp.now()
    }

    interactions_collection.insert_one(interaction_data)

    # Update FAISS index after interaction
    update_faiss_index()

    return jsonify({"message": "Interaction logged successfully!"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
