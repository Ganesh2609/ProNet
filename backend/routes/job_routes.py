from flask import Blueprint, jsonify, request
import json
import time

job_bp = Blueprint('jobs', __name__)

# Helper function to read jobs data
def get_jobs():
    try:
        with open('data/jobs.json', 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

# Helper function to write jobs data
def save_jobs(jobs):
    with open('data/jobs.json', 'w') as f:
        json.dump(jobs, f, indent=2)

# Helper function to read companies data
def get_companies():
    try:
        with open('data/companies.json', 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}

# Get all jobs
@job_bp.route('/', methods=['GET'])
def get_all_jobs():
    jobs = get_jobs()
    
    # Add company data to jobs
    companies = get_companies()
    for job in jobs:
        company_id = job.get('companyId')
        if company_id and company_id in companies:
            job['company'] = companies[company_id]
    
    return jsonify(jobs)

# Get job by ID
@job_bp.route('/<job_id>', methods=['GET'])
def get_job(job_id):
    jobs = get_jobs()
    job = next((j for j in jobs if j.get('id') == job_id), None)
    
    if not job:
        return jsonify({"error": "Job not found"}), 404
    
    # Add company data to job
    companies = get_companies()
    company_id = job.get('companyId')
    if company_id and company_id in companies:
        job['company'] = companies[company_id]
    
    return jsonify(job)

# Search jobs
@job_bp.route('/search', methods=['GET'])
def search_jobs():
    query = request.args.get('q', '').lower()
    location = request.args.get('location', '').lower()
    
    jobs = get_jobs()
    
    # Filter jobs based on query and location
    if query or location:
        filtered_jobs = []
        for job in jobs:
            title = job.get('title', '').lower()
            description = job.get('description', '').lower()
            job_location = job.get('location', '').lower()
            company_id = job.get('companyId')
            
            companies = get_companies()
            company_name = ''
            if company_id and company_id in companies:
                company_name = companies[company_id].get('name', '').lower()
            
            # Match query in title, description, or company name
            query_match = not query or query in title or query in description or query in company_name
            
            # Match location
            location_match = not location or location in job_location
            
            if query_match and location_match:
                # Add company data to job
                if company_id and company_id in companies:
                    job['company'] = companies[company_id]
                
                filtered_jobs.append(job)
        
        return jsonify(filtered_jobs)
    
    # If no query or location, return all jobs
    companies = get_companies()
    for job in jobs:
        company_id = job.get('companyId')
        if company_id and company_id in companies:
            job['company'] = companies[company_id]
    
    return jsonify(jobs)

# Create new job
@job_bp.route('/', methods=['POST'])
def create_job():
    if not request.json:
        return jsonify({"error": "Invalid data"}), 400
    
    jobs = get_jobs()
    
    # Create new job
    new_job = {
        "id": str(int(time.time())),
        "createdAt": int(time.time()),
        **request.json
    }
    
    jobs.append(new_job)
    save_jobs(jobs)
    
    return jsonify(new_job), 201

# Apply for a job
@job_bp.route('/apply', methods=['POST'])
def apply_for_job():
    if not request.json:
        return jsonify({"error": "Invalid data"}), 400
    
    user_id = request.json.get('userId')
    job_id = request.json.get('jobId')
    
    if not user_id or not job_id:
        return jsonify({"error": "User ID and Job ID are required"}), 400
    
    jobs = get_jobs()
    job_index = next((i for i, j in enumerate(jobs) if j.get('id') == job_id), None)
    
    if job_index is None:
        return jsonify({"error": "Job not found"}), 404
    
    # Add applicant to job
    if 'applicants' not in jobs[job_index]:
        jobs[job_index]['applicants'] = []
    
    # Check if already applied
    if any(a.get('userId') == user_id for a in jobs[job_index]['applicants']):
        return jsonify({"error": "Already applied for this job"}), 409
    
    application = {
        "userId": user_id,
        "status": "applied",
        "appliedAt": int(time.time())
    }
    
    jobs[job_index]['applicants'].append(application)
    save_jobs(jobs)
    
    return jsonify({"message": "Application submitted successfully"})

# Get user applications
@job_bp.route('/applications/<user_id>', methods=['GET'])
def get_applications(user_id):
    jobs = get_jobs()
    
    # Filter jobs that the user has applied for
    applications = []
    for job in jobs:
        applicants = job.get('applicants', [])
        user_application = next((a for a in applicants if a.get('userId') == user_id), None)
        
        if user_application:
            # Add company data to job
            company_id = job.get('companyId')
            companies = get_companies()
            if company_id and company_id in companies:
                job['company'] = companies[company_id]
            
            # Add application status and date
            job['applicationStatus'] = user_application.get('status')
            job['appliedAt'] = user_application.get('appliedAt')
            
            applications.append(job)
    
    return jsonify(applications)