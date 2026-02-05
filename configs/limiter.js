import rateLimit from 'express-rate-limit';

const limiterConfig = rateLimit({
  windowMs: 1000 * 60 * 15,
  max: 100,
  message: 'Too many request from this IP, please try again later!',
});

export default limiterConfig;
