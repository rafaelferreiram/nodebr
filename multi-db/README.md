docker run \
    --name postgres \
    -e POSTGRES_USER=rafaelferreiram \
    -e POSTGRES_PASSWORD=xingling1971@ \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres
