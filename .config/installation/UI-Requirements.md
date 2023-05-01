# Questions

. What would you like to call your luxury workspace? my_cool_software
. What would you like the default password for the code editor to be? 123456789
. What would you like the repository prefix for your docker images and containers to be? luxury
. What port would you like to expose the code editor on? 12345
. Would you like the code editor limited to the local device (explicitly mapping the exposed docker port to 127.0.0.1)? Y
. Would you like me to generate a Dockerfile? Y
	a. What would you like the Dockerfile to be called? Dockerfile_LUXURY
	b. Would you like to run Stricture on a folder/file? N
	    i.   Which file? ./Model.ddl
	c. Would you like MySQL in the Docker Environment? N
		i.   Would you like to expose the MySQL port? Y
		ii.  What port would you like to expose MySQL on? 3306
		iii. What would you like the default mysql root password to be? 123456789
		iv.  What would you like the database name to be? luxury_database
		v.   Would you like to execute a SQL database population script on container creation (the database is created automatically)? N
		vi.  Which script would you like to run? ./Database-Initialization.sql
	d. Would you like add-ons to be installed by default to Visual Studio Code? Y
		i.   hbenl.vscode-mocha-test-adapter (binding for mocha tests to the test explorer)
		ii.  hbenl.test-adapter-converter (mocha test suite conversion)
		iii. hbenl.vscode-test-explorer (tree view for visualizing and executing tests)
		iv.  ritwickdey.LiveServer (static html web server)
		v.   daylerees.rainglow (tons of color themes like the freshest theme: freshcut)
		vi.  oderwat.indent-rainbow (rainbow-colored indent levels)
. Would you like me to edit the package.json? Y
	a. Docker build statements
	b. Mocha tdd test run statements
	c. Mocha IDE test configurations



