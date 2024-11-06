# Step 1: Use a Python base image
FROM python:3.10-slim

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy requirements and install dependencies
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Step 4: Copy project files
COPY . /app/

# Step 5: Expose the port Django runs on
EXPOSE 8000

# Step 6: Run Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
