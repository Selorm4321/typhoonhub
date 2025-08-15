# Set the working directory inside the container
WORKDIR /workspace

# Copy all files from the current directory on the host to the working directory in the container
COPY . .