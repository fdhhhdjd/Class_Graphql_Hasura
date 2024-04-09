FROM hasura/graphql-engine:v2.38.0

# Cài đặt curl
RUN apt-get update && apt-get install -y curl

# Tải và cài đặt Hasura CLI
RUN curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash

