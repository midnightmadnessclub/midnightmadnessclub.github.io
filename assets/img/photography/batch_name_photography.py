import os
from tkinter import Tk, filedialog, simpledialog

# Function to select a directory
def select_directory():
    root = Tk()
    root.withdraw()  # Hide the root window
    directory = filedialog.askdirectory(title="Select Directory")
    return directory

# Function to ask for the desired base name
def ask_for_base_name():
    root = Tk()
    root.withdraw()  # Hide the root window
    base_name = simpledialog.askstring("Input", "Enter the desired base name for the files:")
    return base_name

# Function to batch rename webp files with a custom base name
def batch_rename_webp_files(directory, base_name):
    if not directory:
        print("No directory selected.")
        return
    
    if not base_name:
        print("No base name provided.")
        return

    # Get all .webp files in the directory
    webp_files = [f for f in os.listdir(directory) if f.lower().endswith('.webp')]
    
    if not webp_files:
        print("No .webp files found in the directory.")
        return

    # Sort files alphabetically
    webp_files.sort()

    # Loop through the files and rename them
    for index, filename in enumerate(webp_files, start=1):
        # Create a new file name in the format 'DESIRED_NAME (1).webp', 'DESIRED_NAME (2).webp', etc.
        new_filename = f"{base_name} ({index}).webp"
        old_file_path = os.path.join(directory, filename)
        new_file_path = os.path.join(directory, new_filename)

        try:
            # Rename the file
            os.rename(old_file_path, new_file_path)
            print(f"Renamed {filename} to {new_filename}")
        except Exception as e:
            print(f"Failed to rename {filename}: {e}")

# Main script
if __name__ == "__main__":
    directory = select_directory()
    base_name = ask_for_base_name()
    batch_rename_webp_files(directory, base_name)
