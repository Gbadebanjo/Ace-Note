FROM node:14-alpine

ENV NODE_ENV=production

ENV PORT=8000

WORKDIR /app

COPY  . .

RUN yarn

# Install TypeScript globally
RUN yarn global add typescript

# Install TypeScript type declarations for the problematic packages
RUN yarn add --dev @types/cookie-parser @types/morgan @types/bcryptjs @types/jsonwebtoken

RUN yarn run compile

EXPOSE 8000

CMD ["yarn", "start"]
