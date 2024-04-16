const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000;
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');



const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const MYSQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcrypt')
const saltRounds = 10


/* ======================== ↑ ↑ ↑ Apply Express.js ↑ ↑ ↑ ======================== */
/* ======================== ↓ ↓ ↓ Connect Database(MYSQL) ↓ ↓ ↓ ======================== */

const option = {
    host : "localhost",
    port : 3306,
    user : "root",
    password : "mysql",
    database : "kj04",
    waitForConnections: true,
    connectionLimit: 10,
}

const db = mysql.createPool(option)

/* ======================== ↑ ↑ ↑ Connect Database(MYSQL) ↑ ↑ ↑ ======================== */
/* ======================== ↓ ↓ ↓ Option ↓ ↓ ↓ ======================== */


const cors = require('cors')

app.use(bodyParser.urlencoded({ extended : true }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(passport.initialize())
app.use(session({
    secret : 'q1w2e3r4',
    resave : false,
    saveUninitialized : true
}))
app.use(passport.session())


const config = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "mysql",
    database: "kj04",
    connectionLimit: 30,
    multipleStatements : true,
};

app.use(
    session({
        secret : "session",
        resave : false,
        saveUninitialized : false,
        store : new MYSQLStore(config),
    })
)


/* ======================== ↑ ↑ ↑ Option ↑ ↑ ↑ ======================== */
/* ======================== ↓ ↓ ↓ Routings ↓ ↓ ↓ ======================== */




app.get('/temp', async (req, res) => {
    try {
        //console.log('/board');
        const [rows, fields] = await db.query("SELECT * FROM sl_board_category");
        console.log(rows)
        res.send(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('서버 에러');
    }
});




/* 로그인 */

/*
app.post("/process/login", async(req, res) => {
    
    let param = [req.body.loginid, req.body.loginpasswd]
    const sql = "SELECT COUNT(*) FROM sl_user WHERE user_id_name = ? AND user_passwd = ?;";
    
    
    await db.query(sql, param, (err, result) => {
        //res.send(result);
        console.log(result[0]);
         if (result[0].cnt === 1) {
           console.log('로그인 성공');
         } else {
            console.log('로그인 실패');
            console.log(result[0].cnt);
         }
    });
    res.redirect('/');
});
*/ 

// 로그인
app.post("/process/login", async (req, res) => {
    const { loginid, loginpasswd } = req.body;

    if (!loginid || !loginpasswd) {
        res.status(400).send('Username and password are required');
        return;
    }

    try {
        const connection = await db.getConnection();
        const [rows] = await connection.execute('SELECT * FROM sl_user WHERE user_id_name = ? AND user_passwd = ?', [loginid, loginpasswd]);

        if (rows.length === 1) {
            req.session.loggedin = true;
            req.session.username = loginid;
            res.json({ isLoggedIn: true });
        } else {
            res.status(401).send('Invalid username or password');
        }

        connection.release();
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
});




// 보호된 라우트
app.get('/protected', (req, res) => {
    if (req.session.loggedin) {
        console.log(`세션 : ${req.session.loggedin}`)
        res.send('Welcome to the protected route, ' + req.session.username + '!');
    } else {
        console.log(`세션 없음`)
        res.status(401).send('Unauthorized, please login first');
    }
});



/* 
req.session.저장하고싶은변수 = 저장하고싶은값;
    req.session.save(function () {
        res.send(true);
    });
*/

// 로그아웃
app.post('/logout', (req, res) => {
    // 세션을 삭제하거나 필요한 로그아웃 작업을 수행합니다.
    req.session.destroy((err) => {
        if (err) {
            console.error('세션 삭제 실패:', err);
            res.status(500).send('세션 삭제 실패');
        } else {
            console.log('로그아웃 성공');
            res.sendStatus(200); // 성공 응답을 보냅니다.
        }
    });
});




/* 회원 가입 */
app.post("/userregister", (req, res) => {

    /* 이메일, 전화번호, 프로필 사진 경로 가공 */
    var emailinput = `${req.body.emailinput1}@${req.body.emailinput2}`
    var telinput = `${req.body.telinput1}-${req.body.telinput2}-${req.body.telinput3}`
    var profilepath;
    if (req.body.profileinput === '') {
        profilepath = 'default_profile.jpg';
    } else {
        profilepath = req.body.profileinput;
    }


    //
    db.query(`INSERT INTO sl_user 
    (user_id_name, user_passwd, user_nickname, user_name, usergrade, user_email, user_tel, user_reg_date, user_profile, user_point)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [req.body.idinput, req.body.passwdinput, req.body.nicknameinput, req.body.nameinput, 0,
        emailinput, telinput, new Date(), profilepath, 0],
        (err, data) => {
            if (!err) {
                res.send(data)
                console.log(data)
            }
            else {
                console.log(err)
            }
        });
        res.redirect(303, '/');
    });


// 아이디 중복 확인 
app.get('/checkid/:inputid', async (req, res) => {
    try {
        const inputid = req.params.inputid;
        console.log(inputid)
        const [rows, fields] = await db.query("SELECT count(*) as 'already' FROM sl_user WHERE user_id_name = ?;", [inputid]);
        console.log('게시물 총 출력')
        console.log(rows)
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('서버 에러');
    }
});


// 마이페이지
app.get('/mypage/:myid', async (req, res) => {
    try {
        const myid = req.params.myid;
        console.log(myid)
        const [rows, fields] = await db.query("SELECT * FROM sl_user WHERE user_id_name = ?;", [myid]);
        console.log('게시물 총 출력')
        console.log(rows)
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('서버 에러');
    }
});




// 회원 정보 수정 GET
app.post("/usermodify/:id", (req, res) => {

    /* 이메일, 전화번호, 프로필 사진 경로 가공 */
    var emailinput = `${req.body.emailinput1}@${req.body.emailinput2}`
    var telinput = `${req.body.telinput1}-${req.body.telinput2}-${req.body.telinput3}`
    var profilepath;
    if (req.body.profileinput === '') {
        profilepath = 'default_profile.jpg';
    } else {
        profilepath = req.body.profileinput;
    }


    //
    db.query(`INSERT INTO sl_user 
    (user_id_name, user_passwd, user_nickname, user_name, usergrade, user_email, user_tel, user_reg_date, user_profile, user_point)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [req.body.idinput, req.body.passwdinput, req.body.nicknameinput, req.body.nameinput, 0,
        emailinput, telinput, new Date(), profilepath, 0],
        (err, data) => {
            if (!err) {
                res.send(data)
                console.log(data)
            }
            else {
                console.log(err)
            }
        });
        res.redirect(303, '/');
    });

// 회원 정보 수정 POST
app.post("/usermodify/:id", (req, res) => {

    /* 이메일, 전화번호, 프로필 사진 경로 가공 */
    var emailinput = `${req.body.emailinput1}@${req.body.emailinput2}`
    var telinput = `${req.body.telinput1}-${req.body.telinput2}-${req.body.telinput3}`
    var profilepath;
    if (req.body.profileinput === '') {
        profilepath = 'default_profile.jpg';
    } else {
        profilepath = req.body.profileinput;
    }


    //
db.query(`INSERT INTO sl_user 
(user_id_name, user_passwd, user_nickname, user_name, usergrade, user_email, user_tel, user_reg_date, user_profile, user_point)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
[req.body.idinput, req.body.passwdinput, req.body.nicknameinput, req.body.nameinput, 0,
    emailinput, telinput, new Date(), profilepath, 0],
    (err, data) => {
        if (!err) {
            res.send(data)
            console.log(data)
        }
        else {
            console.log(err)
        }
    });
    res.redirect(303, '/');
});

// 회원 탈퇴


// 아이디 찾기


// 비밀번호 찾기


// 글목록
app.get('/postlist/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const [rows, fields] = await db.query("SELECT * FROM sl_board LEFT JOIN sl_board_category ON sl_board.category_id = sl_board_category.category_id WHERE sl_board.category_id = ?;", [category]);
        console.log('게시물 총 출력')
        console.log(rows)
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('서버 에러');
    }
});


// 글 내용
app.get('/postdetail/:post', async (req, res) => {
    try {
        //console.log('/board');
        const post = req.params.post
        const [rows, fields] = await db.query("SELECT * FROM sl_board where board_id = ?;", [post]);
        console.log('게시물 총 출력')
        console.log(rows)
        res.send(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('서버 에러');
    }
});

// 글쓰기 
app.post("/postwrite/:category", (req, res) => {

console.log(req.params.category)
const category = req.params.category;
console.log(category)
const session_id = req.session_id;

db.query(`INSERT INTO sl_board 
(board_num, category_id, user_id, board_title, board_contents, board_image, board_reg_date, board_likes, board_views, board_complainted)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
[0, category, 1, req.body.titleinput, req.body.contentinput, req.body.imageinput, new Date(), 0, 0, 0], 
    (err, data) => {
        if (!err) {
            res.send(data)
            console.log(data)
        }
        else {
            console.log(err)
        }
    });
    res.redirect(303, '/');
});

// 댓글 쓰기



// 글 수정 GET




// 글 수정 POST




// 댓글 수정 GET


// 댓글 수정 POST


// 글 삭제 


// 댓글 삭제  







/* ======================== ↑ ↑ ↑ Routings ↑ ↑ ↑ ======================== */
/* ======================== ↓ ↓ ↓ Connection Inspect ↓ ↓ ↓ ======================== */




app.get('/board', (req, res) => {
    console.log('/board')
    db.query("select * from sl_board", (err, data) => {
        if (!err) {
            //console.log(data)
            res.send(data)
        }
        else {
            console.log(err)
        }
    })
})



app.get('/main', async (req, res) => {
    try {
      // MySQL 연결 풀에서 연결을 가져옴
      const connection = await db.getConnection();
      
      // 쿼리 실행
      const [rows, fields] = await connection.query('SELECT * FROM sl_board_category;');
      
      // 연결 해제
      connection.release();
      
      // 결과를 클라이언트에 응답
      res.json(rows);
      console.log(rows)
      console.log(rows)
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).send('서버 에러');
    }
  });



app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}에서 서버 실행중`)
})
