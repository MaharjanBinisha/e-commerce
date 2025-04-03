

# from flask import Flask, request, jsonify
# import numpy as np
# import pandas as pd
# import faiss
# from sklearn.feature_extraction.text import TfidfVectorizer
# from pymongo import MongoClient
# from bson import ObjectId

# app = Flask(__name__)

# # Connect to MongoDB
# client = MongoClient("mongodb+srv://binisha:binisha7613@cluster0.he1e0.mongodb.net")
# db = client["e-commerce"]
# products_collection = db["products"]
# interactions_collection = db["interactions"]

# # Fetch product data from MongoDB
# products = list(products_collection.find({}, {"_id": 1, "name": 1, "category": 1, "description": 1}))

# # Debugging: Print the first product to check its structure
# if products:
#     print("Sample Product from MongoDB:", products[0])
# else:
#     print("No products found in MongoDB!")

# # Ensure `_id` is converted to `id`
# for product in products:
#     product["id"] = str(product["_id"])  # Convert ObjectId to string
#     del product["_id"]  # Remove original MongoDB _id field

# # Convert to DataFrame
# df = pd.DataFrame(products)

# # Debugging: Print DataFrame columns
# print("DataFrame columns:", df.columns)

# # TF-IDF Vectorization
# vectorizer = TfidfVectorizer()
# tfidf_matrix = vectorizer.fit_transform(df["description"])

# # Convert TF-IDF matrix to numpy array
# tfidf_array = tfidf_matrix.toarray()

# # Build FAISS index
# d = tfidf_array.shape[1]
# index = faiss.IndexFlatL2(d)
# index.add(np.array(tfidf_array, dtype=np.float32))


# @app.route('/recommend', methods=['POST'])
# def recommend():
#     data = request.get_json()
#     user_id = data.get("user_id")

#     if not user_id:
#         return jsonify({"error": "user_id is required"}), 400

#     try:
#         user_id = ObjectId(user_id)
#     except:
#         return jsonify({"error": "Invalid user_id format"}), 400

#     # Fetch interactions for this user
#     interactions = list(interactions_collection.find({"userId": user_id}))

#     if not interactions:
#         return jsonify({"error": "No interactions found for this user"}), 404

#     # Extract product IDs from interactions
#     interacted_product_ids = [str(item["_id"]) for interaction in interactions if "items" in interaction for item in interaction["items"]]

#     # Debugging: Print interacted product IDs
#     print("Interacted Product IDs:", interacted_product_ids)

#     # Ensure 'id' exists before filtering
#     if "id" not in df.columns:
#         return jsonify({"error": "Product data is missing 'id' field"}), 500

#     # Find product descriptions for interacted products
#     product_descs = df[df["id"].isin(interacted_product_ids)]["description"].tolist()

#     if not product_descs:
#         return jsonify({"error": "No matching products found for user interactions"}), 404

#     # Transform product descriptions using TF-IDF
#     product_vectors = vectorizer.transform(product_descs).toarray().astype(np.float32)

#     # Search in FAISS for similar products
#     D, I = index.search(product_vectors, 3)

#     recommended_products = []
#     for indices in I:
#         recommended_products.extend(df.iloc[indices].to_dict(orient="records"))

#     # Remove duplicates
#     recommended_products = list({p["id"]: p for p in recommended_products}.values())

#     return jsonify({"recommended_products": recommended_products})@app.route('/recommend', methods=['POST'])
# def recommend():
#     data = request.get_json()
#     user_id = data.get("user_id")

#     if not user_id:
#         return jsonify({"error": "user_id is required"}), 400

#     try:
#         user_id = ObjectId(user_id)
#     except:
#         return jsonify({"error": "Invalid user_id format"}), 400

#     # Fetch interactions for this user
#     interactions = list(interactions_collection.find({"userId": user_id}))

#     if not interactions:
#         return jsonify({"error": "No interactions found for this user"}), 404

#     # Extract product IDs from interactions
#     interacted_product_ids = [str(item["_id"]) for interaction in interactions if "items" in interaction for item in interaction["items"]]

#     # Debugging: Print interacted product IDs
#     print("Interacted Product IDs:", interacted_product_ids)

#     # Ensure 'id' exists before filtering
#     if "id" not in df.columns:
#         return jsonify({"error": "Product data is missing 'id' field"}), 500

#     # Find product descriptions for interacted products
#     product_descs = df[df["id"].isin(interacted_product_ids)]["description"].tolist()

#     if not product_descs:
#         return jsonify({"error": "No matching products found for user interactions"}), 404

#     # Transform product descriptions using TF-IDF
#     product_vectors = vectorizer.transform(product_descs).toarray().astype(np.float32)

#     # Search in FAISS for similar products
#     D, I = index.search(product_vectors, 3)

#     recommended_products = []
#     for indices in I:
#         recommended_products.extend(df.iloc[indices].to_dict(orient="records"))

#     # Remove duplicates
#     recommended_products = list({p["id"]: p for p in recommended_products}.values())

#     return jsonify({"recommended_products": recommended_products})
# Precision@K function
# def precision_at_k(recommended_ids, actual_interacted_ids, k):
#     recommended_k = recommended_ids[:k]  # Take top-k recommendations
#     relevant_items = set(recommended_k) & set(actual_interacted_ids)  # Find relevant recommendations
#     return len(relevant_items) / k if k > 0 else 0  # Compute precision

# @app.route('/recommend', methods=['POST'])
# def recommend():
#     data = request.json
#     user_id = data.get("user_id")

#     try:
#         user_id = ObjectId(user_id)
#     except:
#         return jsonify({"error": "Invalid user_id format"}), 400

#     interactions = list(interactions_collection.find({"userId": user_id}))

#     if not interactions:
#         return jsonify({"error": "No interactions found for this user"}), 404

#     interacted_product_ids = [str(item["_id"]) for interaction in interactions if "items" in interaction for item in interaction["items"]]

#     interacted_categories = set(df[df["id"].isin(interacted_product_ids)]["category"].tolist())

#     product_descs = df[df["id"].isin(interacted_product_ids)]["description"].tolist()

#     if not product_descs:
#         return jsonify({"error": "No descriptions found for interacted products"}), 404

#     product_vectors = vectorizer.transform(product_descs).toarray().astype(np.float32)
#     D, I = index.search(product_vectors, 10)  # Retrieve top 10 recommendations

#     recommended_products = []
#     for indices in I:
#         for idx in indices:
#             if idx < len(df):  # Ensure index is valid
#                 product = df.iloc[idx].to_dict()
#                 if product["category"] in interacted_categories:  # Filter by category
#                     recommended_products.append(product)
    
#     recommended_products = list({p["id"]: p for p in recommended_products}.values())[:10]  # Limit to top 10

#     # Calculate precision@5
#     precision = precision_at_k([p["id"] for p in recommended_products], interacted_product_ids, 5)

#     return jsonify({"recommended_products": recommended_products, "precision@5": precision})

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001, debug=True)



#works fine for recommendation 
# from flask import Flask, request, jsonify
# import numpy as np
# import pandas as pd
# import faiss
# from sklearn.feature_extraction.text import TfidfVectorizer
# from pymongo import MongoClient
# from bson import ObjectId

# app = Flask(__name__)

# # Connect to MongoDB
# client = MongoClient("mongodb+srv://binisha:binisha7613@cluster0.he1e0.mongodb.net")
# db = client["e-commerce"]
# products_collection = db["products"]
# interactions_collection = db["interactions"]

# # Fetch products from MongoDB
# def load_products():
#     products = list(products_collection.find({}, {"_id": 1, "name": 1, "category": 1, "description": 1}))
#     for product in products:
#         product["id"] = str(product["_id"])
#         del product["_id"]
#     return pd.DataFrame(products)

# df = load_products()
# vectorizer = TfidfVectorizer()

# def build_faiss_index():
#     tfidf_matrix = vectorizer.fit_transform(df["description"])  
#     tfidf_array = tfidf_matrix.toarray().astype(np.float32)
    
#     index = faiss.IndexFlatL2(tfidf_array.shape[1])
#     index.add(tfidf_array)
    
#     return index

# def precision_at_k(recommended_ids, actual_interacted_ids, k):
#     recommended_k = recommended_ids[:k]  
#     relevant_items = set(recommended_k) & set(actual_interacted_ids)  
#     return len(relevant_items) / k if k > 0 else 0  

# @app.route('/recommend', methods=['POST'])
# def recommend():
#     global df  # Ensure we're using the latest data
#     df = load_products()
#     index = build_faiss_index()  

#     data = request.json
#     user_id = data.get("user_id")

#     try:
#         user_id = ObjectId(user_id)
#     except:
#         return jsonify({"error": "Invalid user_id format"}), 400

#     interactions = list(interactions_collection.find({"userId": user_id}))

#     if not interactions:
#          return jsonify({"error": "No interactions found for this user"}), 404

#     interacted_product_ids = [str(item["_id"]) for interaction in interactions if "items" in interaction for item in interaction["items"]]

#     interacted_categories = set(df[df["id"].isin(interacted_product_ids)]["category"].tolist())

#     product_descs = df[df["id"].isin(interacted_product_ids)]["description"].tolist()

#     if not product_descs:
#         return jsonify({"error": "No descriptions found for interacted products"}), 404

#     product_vectors = vectorizer.transform(product_descs).toarray().astype(np.float32)

#     # Use most recent product as query
#     query_vector = product_vectors[-1].reshape(1, -1) if len(product_vectors) > 1 else product_vectors

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

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001, debug=True)


#working for now code()
#
#
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
CORS(app, origins=["http://localhost:5173"], supports_credentials=True)

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

# Function to compute precision@k
def precision_at_k(recommended_ids, actual_interacted_ids, k):
    recommended_k = recommended_ids[:k]  
    relevant_items = set(recommended_k) & set(actual_interacted_ids)  
    return len(relevant_items) / k if k > 0 else 0  

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

    precision = precision_at_k([p["id"] for p in recommended_products], interacted_product_ids, 10)

    return jsonify({"recommended_products": recommended_products, "precision@10": precision})


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
