VUE_APP_BV_API_HOST ?= http://localhost:4000

run:
	VUE_APP_MB_APP_ID=44888c7245eef035a143cf4c40c64792 VUE_APP_MB_REDIRECT_URI=http://localhost:4000/mb-success VUE_APP_HC_APP_ID=5ffc69299e6c410c7eef5163 VUE_APP_BV_API_HOST="${VUE_APP_BV_API_HOST}" npm run serve
