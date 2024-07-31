import sqlite3

DataBase_Path = r"C:\Users\hp\gx\Bachar.db"

def Add_User(UserName, Password, Phone, Address, Plastic, Glass, Paper, Metal):
    user = (UserName, Password, Phone, Address, Plastic, Glass, Paper, Metal)
    try:
        with sqlite3.connect(DataBase_Path) as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO Users (UserName, Password, Phone, Address, Plastic, Glass, Paper, Metal)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """,
                user,
            )
            conn.commit()
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")

def Add_Quest(Plastic, Glass, Paper, Metal, Valid, Agent, UserId):
    quest = (Plastic, Glass, Paper, Metal, Valid, Agent, UserId)
    try:
        with sqlite3.connect(DataBase_Path) as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO Quests (Plastic, Glass, Paper, Metal, Valid, Agent, UserId)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                quest,
            )
            conn.commit()
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")

def Get_User(user_id):
    try:
        with sqlite3.connect(DataBase_Path) as conn:
            cursor = conn.cursor()
            cursor.execute("PRAGMA table_info(Users)")
            columns_info = cursor.fetchall()
            column_names = [info[1] for info in columns_info]

            cursor.execute("SELECT * FROM Users WHERE UserId = ?", (user_id,))
            user = cursor.fetchone()

            if user:
                user_dict = dict(zip(column_names, user))
                return user_dict
            else:
                return None
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
        return None

def Get_User11(user_name, password):
    try:
        with sqlite3.connect(DataBase_Path) as conn:
            cursor = conn.cursor()
            cursor.execute("PRAGMA table_info(Users)")
            columns_info = cursor.fetchall()
            column_names = [info[1] for info in columns_info]

            cursor.execute(
                "SELECT * FROM Users WHERE UserName = ? AND Password = ?", (user_name, password)
            )
            user = cursor.fetchone()

            if user:
                user_dict = dict(zip(column_names, user))
                return user_dict
            else:
                return None
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
        return None
