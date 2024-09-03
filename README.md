## Summary

Have you ever struggled to connect to CometNet or the UTD VPN? Are you having difficulty downloading software on your computer? Do you wish there was an easier way to resolve your technical issues quickly and effortlessly?

Introducing FixIT, an AI-driven app designed to provide instant IT support to students and faculty. Leveraging advanced AI technology, FixIT offers personalized support and solutions for all your technological needs. With FixIT, you no longer need to wait in line at the IT Help Desk; you can resolve your issues swiftly and independently. Experience hassle-free IT support with FixIT, your one-stop solution for all tech-related problems.

## MVP

- **User account with user authentication.**
- **Self-Service Portal:**
  - Interactive chatbot for real-time assistance.
  - FAQ section with search functionality.
  - Step-by-step guides for common issues.
  - Add speech-to-text capabilities for better communication.
- **Web Scraping:**
  - Automate the extraction of articles from the OIT knowledge base using BeautifulSoup or Scrapy.
  - Use Selenium for dynamic content scraping, if necessary.
  - Regularly update the content to reflect the latest information.
- **Knowledge Base (Backend):**
  - Central repository of articles and guides stored in MongoDB.
  - Regular updates with new solutions via automated web scraping and manual input.
- **AI-driven Troubleshooting:**
  - Utilize Amazon Kendra to provide personalized support based on existing OIT articles.
  - Incorporate Amazon Transcribe to understand and respond to user queries.

## Stretch Goals

- **Personalized Assistance:**
  - User-specific recommendations based on past interactions.
  - Integration with user accounts for personalized help.
  - Ability to upload error page images for real-time assistance.
- **Feedback Mechanism:**
  - Option for users to rate the solutions.
  - Collect feedback to improve AI accuracy and content relevance.
- **Deploy app for use to UTD students/faculty:**
  - Ensure the app is accessible and easy to use for the entire UTD community.

## Milestones

<details>
  <summary>Week 1 (Build Night 1 – Dev Night 1)</summary>

  - Meet team, decide frontend/backend teams, set up development environment, finalize tech stack.

  **Before Design Day**

  - Familiarize yourself with tech stack (link resources)
    - Frontend: React
    - Backend: MongoDB, Node, Express, AWS services

  **Design Day**

  - Setup:
    - Create react app
    - Create MongoDB project.
    - Github repo
    - Flesh out collective vision for the app
    - Identify common IT issues and solutions
    - Learn basics of MERN Stack

  **Tasks:**

  - **Front-end:**
    - Create low fidelity wireframes (Figma if familiar)
    - Learn React (tutorials)
  - **Backend:**
    - Learn MongoDB
    - Set up the server and database.
    - Learn basics of Auth0 and Web scraping Set-up
    - Research open source LLMs

  **Dev Night 1:**

  - Troubleshoot github/react/mongoDB setup issues if any.

</details>

<details>
  <summary>Week 2 (Dev Night 1 – Build Night 2)</summary>

  **Team meeting**

  - Flesh out full vision of the App

  **Front-end:**

  - Learn React
  - Show High fidelity Figma pages (as many pages as possible)
  - Code Sign-up/Login/User page screens
  - Start coding “Self-Service Portal” screens by breaking it down into different sections.

  **Backend:**

  - Develop web scraping scripts using BeautifulSoup or Scrapy to extract articles.
  - Set up a database to store web-scraped data information.
  - Set up user authentication.
  - Research Amazon Transcribe.

  **Build Night 2:**

  **Front-end:**

  - Figma pages (complete core pages)
  - Login pages (implemented)

  **Back-end:**

  - User Authentication complete
  - Able to store user information in the database (user models created)
  - Able to store web-scraped information in the database (primary testing of accuracy of data collected)
  - Show initial database design

</details>

<details>
  <summary>Week 3 (Build Night 2 – Dev Night 2)</summary>

  **Team meeting:**

  **Front-end and Backend Integration:**

  - User Auth Backend with Login Pages Frontend

  **Frontend:**

  - Finalize UI Design for all pages
  - Start coding “Self-Service Portal” screens by breaking it down into different sections.

  **Back-end:**

  - Set up a database to store web-scraped data accurately
  - Research Amazon transcribe

  **Dev Night 2:**

  - Troubleshoot errors
  - Make up for delayed parts/edit design choices if needed.

</details>

<details>
  <summary>Week 4 (Dev Night 2 – Build Night 3)</summary>

  **Team meeting:**

  **Frontend:**

  - Finish Self-Service Portal
  - Start on other pages (based on priority level)

  **Back-end:**

  - Start fine-tuning LLMs
  - Implement ability to convert speech to text capabilities.

  **Build Night 3:**

  **Front end:**

  - Self-Service Portal (complete)

  **Backend:**

  - Database storage set up (complete)
  - Discuss potential roadblocks/delays
</details>

<details>
  <summary>Week 5/6 (Build Night 3 – Dev Night 3) </summary>

  **Team meeting:**

  - Address errors
  - Fix up missing tasks
  - Set clear expectations for the next week
  - Finish core features

  **Front-end:**

  - Finish required pages
  - Revise design

  **Back-end:**

  1. **Content Integration:**
     - Import scraped content into the knowledge base.
     - Ensure proper formatting and categorization of articles.
  2. **AI Integration:**
     - Integrate NLP models for the chatbot to understand and respond to user queries.
     - Integrate Amazon Kendra for search capabilities.

  **Full-stack:**

  - Research integration of Open AI for personalized recommendations

  **Dev Night 3:**

  - Integration of finished parts

</details>

<details>
  <summary>Week 7 (Dev Night 3 – Build Night 4)</summary>

  - Backend and frontend communication to finish integrating backend with frontend to connect and test.
  - Polish up MVP
  - AI Update

  **Back-end:**

  - Ensure proper collection of data, and proper response to user queries

</details>

<details>
  <summary>Week 8 (Build Night 4 – Dev night 4)</summary>

  - Finish Features
</details>

<details>
  <summary>Week 9 (Dev Night 4 – Build Night 5)</summary>

  - Work on Stretch goals/any last-minute troubleshooting
</details>

<details>
  <summary>Week 10 (Build Night 5 - Presentation Night)</summary>

  - Practice presentation
</details>

# Tech Stack

- **Frontend:**
  - React for a cross-platform mobile app.
  - Bootstrap or Material-UI for styling.
- **Backend:**
  - Node.js with Express for server-side development.
- **Database:**
  - MongoDB for storing data.
  - Auth0 for user authentication and easier UTD SSO integration.
- **Web Scraping:**
  - BeautifulSoup or Scrapy for web scraping.
  - Selenium for dynamic content scraping (if necessary).
- **AI and Machine Learning:**
  - Amazon Comprehend for NLP tasks.
  - Amazon Transcribe for speech to text capabilities.
  - Amazon Kendra for an intelligent search service.
  - Open Source LLMs

### Resources

- **Web Scraping:**
  - [BeautifulSoup Documentation](https://pypi.org/project/beautifulsoup4/)
  - [Scrapy Documentation](https://docs.scrapy.org/en/latest/)
- **AI Training:**
  - [Amazon Transcribe documentation](https://docs.aws.amazon.com/transcribe/)
  - [Amazon Comprehend documentation](https://docs.aws.amazon.com/comprehend/)
  - [Amazon Kendra Documentation](https://docs.aws.amazon.com/kendra/)
- **Development:**
  - [MERN stack tutorials playlist](https://www.youtube.com/watch?v=98BzS5Oz5E4&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE)
  - [React documentation](https://react.dev/)
  - [Auth0 Guides](https://auth0.com/docs)

## Back-End

### Resources

### APIs

## Software to Install

- [Visual Studio Code](https://code.visualstudio.com/) or [Android Studio](https://developer.android.com/studio)
- [Git](https://git-scm.com/downloads) (version control)
- **Web Scraping:**
  - BeautifulSoup, Scrapy, Selenium
  - MongoDB for data storage
  - Python for scripting
- **AI and Machine Learning:**
  - Amazon Kendra
  - Amazon Transcribe for speech to text
- **Frontend and Backend Development:**
  - Node.js, Express
  - React

## Roadblocks and Possible Solutions

 Collecting relevant data from OIT websites 
  - Possible through web scraping/APIs(if available), Search  APIs. 
  - Manual collection of data (for testing phase at least). 
  - Collect data from other online resources as well as OIT web articles.
  AI/Web scraping concepts new to participants 
  - Enough time allocated for learning phase.
  - Keeping the app simple but functional.

## Competition

Existing IT Support Solutions: 
 - existing university IT support systems: OIT Help Desk (slow  process) 
 - online articles (have to know as a user where to look)
 
## Other Resources

 - [Git cheat sheet](https://education.github.com/git-cheat-sheet-education.pdf)
 - [Git in-depth tutorial](https://youtu.be/RGOj5yH7evk)
 - [Postman set up tutorial](https://youtu.be/3eHJkcA8mTs)
 - [Sharing any graphics using Box](https://utdallas.account.box.com/login)
 - [Sign up for Figma](https://www.figma.com/signup)
 - [Wireframe design inspiration](https://dribbble.com/shots/popular/web-design)
 - Resources to make presentations:
 - [Pitch (more “professional” templates)](https://pitch.com/)
 
 
## Developers 👥
- Bhaumik Tiwari
- Nykaela Burks
- Carson Smith
- Aayush Srivastava
- Ugonna Anyalemechi

## Project Team
- Nadeeba Atiqui - Project Manager
- Bryce Duncan - Industry Mentor

