# Stage 1: Scanner - Install bandit and scan the code for vulnerabilities
FROM python:3.11-slim AS scanner

# Install bandit
RUN pip install bandit

# Copy application code and run bandit
COPY . /app
RUN bandit -r /app -ll -iii --quiet

# Stage 2: Builder - Install dependencies
FROM python:3.11-slim AS builder

# Set working directory
WORKDIR /app

# Create a non-root user
RUN addgroup --system pythonuser && adduser --system --ingroup pythonuser pythonuser

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip wheel --no-cache-dir --wheel-dir /wheels -r requirements.txt

# Stage 3: Production - Final image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Create and switch to the non-root user
RUN addgroup --system pythonuser && adduser --system --ingroup pythonuser pythonuser

# Copy installed dependencies from builder stage
COPY --from=builder /wheels /wheels

# Copy application code
COPY . .

# Install dependencies from wheels
RUN pip install --no-cache /wheels/*

# Change ownership of the app directory
RUN chown -R pythonuser:pythonuser /app

# Switch to the non-root user
USER pythonuser

# Expose the port Gunicorn will run on
EXPOSE 5000

# Use Gunicorn to run the app.
# The number of workers is a good starting point. Adjust based on performance testing.
# We also externalize the host, port, and log-level.
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "--log-level", "info", "app:app"]
