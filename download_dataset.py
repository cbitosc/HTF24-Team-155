import kagglehub

# Download latest version
path = kagglehub.dataset_download("anth7310/mental-health-in-the-tech-industry")

print("Path to dataset files:", path)
