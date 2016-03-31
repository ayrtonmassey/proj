An Interactive Learning Platform for Compiler Data-Flow Analysis
================================================================

**UG4 Honours Project:* Ayrton Massey, *s1208057*


## Contents

This archive contains the application code & required libraries,
dissertation raw files, compiled dissertation files and any
miscellaneous notes taken throughout the project.

The following is a list of root directories and their contents:

 - app/

   - The main JavaScript application files and libraries

 - tracking_api/

   - The Django REST Framework API for tracking interaction events

 - dissertation/

   - The dissertation raw and compiled files

 - data/

   - The raw data used to conduct the evaluation and the code required
     to generate the graphs

 - rdsim/

   - A python simulator of reaching definitions analysis, written as a
     preliminary experiement

 - misc/

   - Notes taken throughout the project and any other unimportant, but
     relevant, files

## Installing the Learning Platform Application

The application is hosted at the following URL:

    http://ayrtonmassey.com/proj/

If you simply wish to use it, not set one up for yourself, please
visit it at this address.

Otherwise, the platform consists entirely of client-side JavaScript,
CSS and HTML and should be suitable for hosting on any standard HTTP
server such as Apache or Nginx. Copying the entire app/ folder to your
www/ directory should be sufficient.

The application requires the peg.js and handlebars node packages in
order to compile the templates and grammar. If you make any changes to
these files, you must navigate to the app/ directory and run the
`make` command (makefile is included).

It is also possible to view the files on the local filesystem by
navigating to the following address in your web browser:

    file:///path/to/project/app/index.html

At present, external libraries are included via CDN links (with some
exceptions) so an internet connection is required to use the
application. All of the necessary library files are included locally,
but you will have to uncomment the lines in index.html to use these
files.

If you have any questions, e-mail me @ ayrtonmassey@googlemail.com OR
s1208057@sms.ed.ac.uk

### Data-Flow Analysis Simulator

If you wish to separate the simulator for use in your own project,
simply copy the app/js/simulator/ directory to another location. You
may also require js/kludge.js for some functionality.



## Installing the Tracking API

Installing the tracking API requires additional set-up using the
mod_wsgi module for Apache (assuming you are hosting via Apache).

Instructions for setting up Django REST Framework applications are
available on the web.


## Dissertation

The dissertation was compiled using TeXLive 2015. You may recompile it
with this distribution.

A fully copy is included as dissertation/main.pdf, and a version split
into black and white / colour copies is available in dissertation/split.


## Final Comments

Apologies for the lack of documentation - I'm writing this at 14:52,
31/03/16.

Again, if you have any questions, e-mail me @ ayrtonmassey@googlemail.com OR
s1208057@sms.ed.ac.uk