<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT LOGO -->

<br />
<div align="center">
  <!-- <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

<h3 align="center">Football Fantasizer</h3>

  <p align="center">
    An automated Fantasy Football manager
    <br />
  </p>
</div>

<br />

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <!-- <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul> -->
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<br /><br />

<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

The Football Fantasizer is an automated fantasy football manager created to login and optimize your lineup on a routine basis.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

The below steps will walk through the process of installing the prerequisite packages forrunning the application.

### Prerequisites

Requires Node.js & npm package manager

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/johnentrieri/football-fantasizer.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Save a copy of `secrets_template.js` as `secrets.js` and replace email & password fields with appropriate login information.

4. Modify settings in `settings.json` (optional)
    - **LOGIN_DELAY** - While developing, account may be flagged if too many login requests are submitted too frequently. Adjust this field to prevent accidental locking of account. Time is is milliseconds, default is 300000 (5 minutes).

    - **LOGFILE_NAME** - The filename for logging debugging output too.

    - **LEAGUE_ID** - Fantasy League ID. Can be stolen from URL while viewing Roster in any web browser.

    - **TEAM_ID** - Fantasy Team ID. Can be stolen from URL while viewing Roster in any web browser.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Run the following command to execute the application a single time from the command line.

```
node index
```
To completely automate the process, the application can be scheduled using a batch script / Task Scheduler (Windows) or a shell script / Crontab (Unix/Linux).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


