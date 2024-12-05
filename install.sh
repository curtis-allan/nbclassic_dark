#!/bin/bash

config_dir=$(jupyter --config-dir)
custom_dir="$config_dir/custom"

# Create custom directory if it doesn't exist
mkdir -p "$custom_dir"

# For each custom file
for file in custom.css custom.js; do
    # Backup existing file if it exists
    if [ -f "$custom_dir/$file" ]; then
        mv "$custom_dir/$file" "$custom_dir/${file}_old"
        echo "Backed up existing $file"
    fi
    
    # Copy new file
    if [ -f "custom/$file" ]; then
        cp "custom/$file" "$custom_dir/"
        echo "Installed $file"
    else
        echo "Warning: $file not found in source directory"
    fi
done
