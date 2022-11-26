# cloudops
## How to run
`git clone`
`npm install`
`npm start -- -p ./test.txt -m read -s true`

The application should accept two input parameters
Path to a text file used to read from or write to
Read/write switch denoting whether the user action is to read the file or to write to the file
When the user action is to "read" the file
You should read the file line by line and find the word "imperdiet" in every line
The output of the read operation is to
count how many times the word "imperdiet" exists in the file
and in how many lines it appears
When the user action is to "write" to the file
You should prompt the user to enter a sentence
You should look for the word "imperdiet" in every sentence entered by the user
The output of the "write" action should be
how many sentences the user entered
how many times the word "imperdiet" appear in the user input
in how many sentences the word "imperdiet" appeared
