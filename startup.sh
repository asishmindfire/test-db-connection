#!/bin/bash

# Export platform environment variables
eval $(printenv | sed -n "s/^\([^=]\+\)=\(.*\)$/export \1=\2/p" | sed 's/"/\\\"/g' | sed '/=/s//="/' | sed 's/$/"/') >> /etc/profile

# Print the IDENTITY_ENDPOINT environment variable to the log
echo "IDENTITY_ENDPOINT =>: $IDENTITY_ENDPOINT"

# Execute the original command (start your application)
exec "$@"
