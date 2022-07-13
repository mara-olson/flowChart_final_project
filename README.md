# FlowChart

Fitness training periods and menstrual periods don't happen in isolation, and understanding how they interact on a personalized level can drastically improve performance and well-being.
<br><br>FlowChart is a web tracking app that allows users to log both activities and menses/symptoms, visualize their overlay in a monthly calendar and graph, and monitor personal statistics.
FlowChart also allows users to sync directly with [Strava](https://www.strava.com/) so that all of their fitness tracking lives in one place, making it simple and easy to go with the flow!
<br>
![floChart Homepage](/static/static/floChartHomepageImage.png)
<br>

## Table of Contents

- [Technologies Used](#technologiesused)
- [Key Features](#features)
  <br>

### <a name="technologiesused">Technologies Used</a>

#### Frontend

FlowChart utilizes React’s component-based architecture, each of which are built entirely from scratch stylized with inhouse CSS rather than imported as pre-made components.
Specific technologies include:

- React
- JavaScript
- Chart.js
- HTML
- CSS

#### Backend

FlowChart uses the full range of get, put, post, and delete requests to fetch from Flask app routes, and also utilizes a mix of session, local storage, and React’s concept of updating state to store information outside the PostgreSQL database.
Specific technologies:

- PostgreSQL
- SQLAlchemy
- Flask

#### API

Connecting with Strava via direct authentication via OAuth 2.0. The process involves verification of required scopes (authorization for user activity read access), exchanging the auth code for a temporary access token, receiving a refresh token, and finally making API requests for athlete data.

<br>

### <a name="use">Key Features</a>

FlowChart is a comprehensive logging, tracking, and visualization app for both activity and menstrual data. Key features include:

- Monthly calendar
  - Activity snapshots are displayed on the corresponding date
  - Menstrual logs are highlighted on the relevant dates
  - Details are viewable by clicking on the date of interest
  - Data can be edited or deleted directly from the detail view
- Chart
  - Mileage over time is displayed in blue
  - Menstrual flow volume is displayed in pink (0 = no flow, symptoms only; 1 = light flow; 2 = moderate; 3 = heavy flow)
- Stats
  - Total monthly mileage
  - Date of last reported menstrual period
- Data details
  _ A tabular view of all activity data (both user-logged & pulled from Strava) can be found under the Training Periods tab in the navigation bar
  _ A tabular view of all logged menstrual data can be found under the Menstrual Periods tab in the navigation bar
  <br>
