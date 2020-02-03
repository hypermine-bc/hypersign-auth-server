FROM node
WORKDIR /hs-auth-server
COPY . /hs-auth-server
RUN npm install
CMD ["npm", "run", "start"]