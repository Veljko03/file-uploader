const pool = require("../db/pool");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const GoogleStrategy = require("passport-google-oidc");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/google/callback",
      scope: ["profile"],
    },
    function verify(issuer, profile, cb) {
      // pool.query(
      //   "SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?",
      //   [issuer, profile.id],
      //   function (err, row) {
      //     if (err) {
      //       return cb(err);
      //     }
      //     if (!row) {
      //       db.run(
      //         "INSERT INTO users (name) VALUES (?)",
      //         [profile.displayName],
      //         function (err) {
      //           if (err) {
      //             return cb(err);
      //           }
      //           var id = this.lastID;
      //           db.run(
      //             "INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)",
      //             [id, issuer, profile.id],
      //             function (err) {
      //               if (err) {
      //                 return cb(err);
      //               }
      //               var user = {
      //                 id: id,
      //                 name: profile.displayName,
      //               };
      //               return cb(null, user);
      //             }
      //           );
      //         }
      //       );
      //     } else {
      //       db.get(
      //         "SELECT * FROM users WHERE id = ?",
      //         [row.user_id],
      //         function (err, row) {
      //           if (err) {
      //             return cb(err);
      //           }
      //           if (!row) {
      //             return cb(null, false);
      //           }
      //           return cb(null, row);
      //         }
      //       );
      //     }
      //   }
      // );
    }
  )
);

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const { rows } = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [email]
        );

        const user = rows[0];

        if (!user) {
          return done(null, false, { message: "Incorrect email" });
        }
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});
