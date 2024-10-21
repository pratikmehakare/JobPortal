const jobDetailsTemplate = (company, jobTitle, description, experience, endDate) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Job Details</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.6;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: left;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                background-color: #f9f9f9;
            }
    
            .header {
                font-size: 24px;
                font-weight: bold;
                color: #333333;
                margin-bottom: 10px;
                text-align: center;
            }
    
            .job-title {
                font-size: 20px;
                font-weight: bold;
                margin-top: 20px;
                color: #0056b3;
            }
            .title{
            font-size: 15px;
            font-weight: bold;
            text-align: center;
            color: #0056b3;
            }
    
            .company {
                font-size: 18px;
                font-weight: bold;
                margin-top: 5px;
                color: #444444;
            }
    
            .description {
                margin-top: 15px;
                font-size: 16px;
                line-height: 1.5;
                color: #555555;
            }
    
            .experience {
                margin-top: 15px;
                font-size: 16px;
                color: #444444;
            }
    
            .end-date {
                margin-top: 15px;
                font-size: 16px;
                color: #ff0000;
                font-weight: bold;
            }
    
            .cta {
                display: inline-block;
                padding: 10px 20px;
                background-color:#ffffff ;
                color:   #0056b3;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
                text-align: center;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <div class="title">Cuvette</div>
            <div class="header">Job Opportunity at ${company}</div>
            <div class="job-title">${jobTitle}</div>
            <div class="company">${company}</div>
            <div class="description">${description}</div>
            <div class="experience"><strong>Experience Required:</strong> ${experience} years</div>
            <div class="end-date"><strong>Application Deadline:</strong> ${endDate}</div>
            <a href="#" class="cta">Apply Now</a>
        </div>
    </body>
    
    </html>`;
};

module.exports = jobDetailsTemplate;
