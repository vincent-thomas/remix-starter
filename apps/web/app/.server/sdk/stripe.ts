import Stripe from "stripe";

export const stripeSdk = new Stripe(env.STRIPE_SECRET_KEY);
