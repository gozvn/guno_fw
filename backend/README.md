# Brand safety backend API

# Install package
Run `npm install`

# Rename file `.env.example` to `.env`

# Run gen api docs
Run `npm run start-gendoc`

# Run api
Run `npm run start`

# DB Migrations example
Run `cd backend/modules/core`

Run `npx sequelize-cli db:migrate --config=../../configs/config.json`

## Migration Skeleton
Run `npx sequelize-cli migration:generate --name migration-skeleton`

## Create Model

`npx sequelize-cli model:generate --name User --attributes realName:string,address:string --models-path=../models`

# Running seed all
`npx sequelize-cli db:seed:all --config=../../configs/config.json`

# Run jwt keygen
`npm run keygen-jwt`

# Run keygen
`npm run keygen-rsa`
#### private & public keys will be stored in dir `storage/keys`


54: Mới
55: Đang xác nhận
56: Đã xác nhận
57: Chờ xác nhận

42: Đang đóng hàng
40: Đã đóng gói
43: Chờ thu gom

58: HVC hủy
59: Đang chuyển

60: Thành công (yêu cầu phải có deliveryDate với format YYYY-MM-DD)
61: Thất bại
63: Khách hủy (cần set reason)
64: Hệ thống hủy (cần set reason)

68: Hết hàng (set reason)

71: Đang hoàn (set reason, deliveryDate)
72: Đã hoàn (set reason, deliveryDate)
73: Đổi kho hàng
74: Xác nhận hoàn

