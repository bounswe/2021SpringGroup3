npm i -g yarn &&
yarn &&
yarn dev


If you want to get dump of our current database, you can use 

 mongodump --uri="mongodb://backend:6CSn4seaXmabjdYQ@64.225.110.78:1234/prod?authSource=admin&retryWrites=true&w=majority"

please note that you need to install Mongodb community version (https://www.mongodb.com/try/download/community) to run this command

Later, you can restore it to your own database using mongorestore command:

mongorestore --uri="your new connection uri" /dump

