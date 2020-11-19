from flask import Flask, render_template, request
from flask_mysqldb import MySQL
# from flask-mysqldb-connector import MySQL
import yaml


app = Flask(__name__)

#Parameters to configure to connect db with this app
#this are all sensitive info and we don't want to expose them as part of our app. Let's store them in config file db.yaml
db = yaml.load(open('db.yaml'))    #let's store in the variable called db
app.config['MYSQL_HOST'] = db['mysql_host']   #the host of mysqldb
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']

mysql = MySQL(app)

@app.route('/', methods=['GET', 'POST'])
def index():
    # return 'TEST'
    if request.method == 'POST':
        #Fetch form data
        userDetails = request.form
        name = userDetails['name']
        email = userDetails['email']
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO users(name, email) VALUES(%s, %s)", (name, email))
        mysql.connection.commit()
        cur.close()
        return 'success'


    return render_template('index.html')

@app.route('/users')
def users():
    cur = mysql.connection.cursor()
    resultValue = cur.execute("SELECT * FROM users")
    if resultValue > 0:
        userDetails = cur.fetchall()
        return render_template('users.html', userDetails=userDetails)

if __name__ == '__main__':
    app.run(debug=True)
    app.run('localhost', 5000)