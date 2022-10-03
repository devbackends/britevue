FROM registry.access.redhat.com/ubi8/nodejs-14:latest as builder
WORKDIR /bv
USER root
RUN chown -R 1001:1001 /bv
USER 1001
COPY . .
RUN npm install
ENV VUE_APP_BV_API_HOST=https://bv.murraydistributedtechnologies.com
ENV VUE_APP_HC_APP_ID=602f28a22a16290e63b02ee6
ENV VUE_APP_MB_APP_ID=91d0ba43ae6bb7fe82a2af7946fdab78
ENV VUE_APP_MB_REDIRECT_URI=https://bv.murraydistributedtechnologies.com/mb-success
RUN npm run build
FROM docker.io/galtbv/bv-nginx:latest

# Copy individually
COPY --from=builder /bv/dist/*.html .
COPY --from=builder /bv/dist/*.svg .
COPY --from=builder /bv/dist/css css
COPY --from=builder /bv/dist/fonts fonts
COPY --from=builder /bv/dist/img img
COPY --from=builder /bv/dist/js js

CMD ["nginx", "-g", "daemon off;"]
