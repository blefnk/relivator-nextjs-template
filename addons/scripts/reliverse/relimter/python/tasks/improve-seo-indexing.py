# 🐞 untested too much | inspired by @see https://vercel.com/blog/how-google-handles-javascript-throughout-the-indexing-process

import os
import re


# Function to analyze JavaScript (ts/tsx) files in the src folder
def analyze_js_files(src_path):
    recommendations = []

    for subdir, _, files in os.walk(src_path):
        for file in files:
            if file.endswith(".ts") or file.endswith(".tsx"):
                file_path = os.path.join(subdir, file)
                with open(file_path, "r") as f:
                    content = f.read()

                # Recommendation 1: Ensure critical SEO tags are present in server-side rendering
                if (
                    "getServerSideProps" not in content
                    and "getStaticProps" not in content
                ):
                    recommendations.append(
                        f"File {file_path}: Consider using getServerSideProps or getStaticProps for better SEO."
                    )

                # Recommendation 2: Ensure critical resources are not blocked by robots.txt
                if "robots.txt" in file_path:
                    recommendations.append(
                        f"File {file_path}: Ensure critical resources are not blocked in robots.txt."
                    )

                # Recommendation 3: Create clear internal linking structure
                links = re.findall(r'href="([^"]+)"', content)
                if not links:
                    recommendations.append(
                        f"File {file_path}: No internal links found. Consider adding internal links for better crawlability."
                    )

                # Recommendation 4: Use lazy-loading for images
                if "img" in content and 'loading="lazy"' not in content:
                    recommendations.append(
                        f"File {file_path}: Consider using lazy-loading for images for better performance."
                    )

                # Recommendation 5: Presence of error boundaries in React components
                if (
                    "componentDidCatch" not in content
                    and "ErrorBoundary" not in content
                ):
                    recommendations.append(
                        f"File {file_path}: Consider using error boundaries in React components to prevent render failures."
                    )

    return recommendations


# Function to check for sitemaps
def check_sitemaps(src_path):
    sitemaps_found = False
    for subdir, _, files in os.walk(src_path):
        for file in files:
            if file == "sitemap.xml":
                sitemaps_found = True
                break
    return sitemaps_found


# Function to display recommendations and apply suggestions
def apply_recommendations(recommendations):
    for rec in recommendations:
        print(rec)
        apply = input("Do you want to apply this recommendation? (yes/no): ")
        if apply.lower() == "yes":
            # Code to apply the recommendation
            # This part would need to be customized based on the specific recommendation
            print(f"Applying: {rec}")
            # For now, we'll just simulate applying the recommendation
            print(f"Recommendation applied: {rec}")
        else:
            print(f"Skipping: {rec}")


# Main function
def main():
    src_path = input("Enter the path to your Next.js src folder: ")
    recommendations = analyze_js_files(src_path)

    if recommendations:
        print("Recommendations found:")
        apply_recommendations(recommendations)
    else:
        print("No recommendations found in JavaScript files.")

    # Check for sitemaps
    sitemaps_found = check_sitemaps(src_path)
    if not sitemaps_found:
        print("No sitemap.xml found. Consider adding a sitemap for better SEO.")
    else:
        print("sitemap.xml found. Ensure it is regularly updated.")


if __name__ == "__main__":
    main()
