const router = require('express').Router();

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const bookingsRouter = require('./bookings.js');
const spotImagesRouter = require('./spotImages.js')
// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null



// router.post('/test', function(req, res) {// you can delete
//     res.json({ requestBody: req.body });
//   });


  // const { setTokenCookie } = require('../../utils/auth.js');// you can delete this
  // const { User } = require('../../db/models');
  // router.get('/set-token-cookie', async (_req, res) => {
  //   const user = await User.findOne({
  //     where: {
  //       username: 'Demo-lition'
  //     }
  //   });
  //   setTokenCookie(res, user);
  //   return res.json({ user: user });
  // });


//if you have a log in user & log out
  const { restoreUser } = require('../../utils/auth.js');//=> auth.js restoreUser

  router.use(restoreUser);//global middleware => up

  router.use('/session', sessionRouter);

  router.use('/users', usersRouter);

  router.use('/spots', spotsRouter);

  router.use('/', reviewsRouter);

  router.use('/', bookingsRouter);

  router.use('/spot-images', spotImagesRouter);

  router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});
//   router.get( //you can delete it
//     '/restore-user',
//     (req, res) => {
//       return res.json(req.user);
//     }
//   );

// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',// hit here
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);// return so get  out from this file(go back to after of app.js middleware you got into and find error handler)
//   }
// );

// ...

module.exports = router;
