import sqlite3

def create_database(db_name):
    """Create a SQLite database with the given name."""
    try:
        conn = sqlite3.connect(db_name)
        print(f"Database '{db_name}' created successfully.")
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
    finally:
        if conn:
            conn.close()

def create_table(db_name, create_table_sql):
    """Create a table from the create_table_sql statement."""
    try:
        conn = sqlite3.connect(db_name)
        cursor = conn.cursor()
        cursor.execute(create_table_sql)
        conn.commit()
        print("Table created successfully.")
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
    finally:
        if conn:
            conn.close()

# Example usage
db_name = 'Bachar.db'

# SQL command to create the Users table
create_users_table_sql = '''
CREATE TABLE "Users" (
	"UserId"	INTEGER,
	"UserName"	TEXT,
	"Password"	TEXT,
	"Phone"	TEXT,
	"Address"	TEXT,
	"Plastic"	INTEGER,
	"Glass"	INTEGER,
	"Paper"	INTEGER,
	"Metal"	INTEGER,
	PRIMARY KEY("UserId" AUTOINCREMENT)
)
'''

create_quests_table_sql = """
CREATE TABLE "Quests" (
	"QuestId"	INTEGER,
	"Plastic"	INTEGER,
	"Glass"	INTEGER,
	"Paper"	INTEGER,
	"Metal"	INTEGER,
	"Valid"	BLOB,
	"Agent"	TEXT,
	"UserId"	INTEGER NOT NULL,
	PRIMARY KEY("QuestId" AUTOINCREMENT),
	FOREIGN KEY("UserId") REFERENCES "Users"("UserId")
)



"""
# Create the database
create_database(db_name)

# Create the Users table
create_table(db_name, create_users_table_sql)
create_table(db_name, create_quests_table_sql)