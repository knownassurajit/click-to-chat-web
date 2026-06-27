# Use lightweight Nginx alpine image
FROM nginx:alpine

# Copy all static project files into Nginx public directory
COPY . /usr/share/nginx/html/

# Expose port 80 for serving HTTP traffic
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
