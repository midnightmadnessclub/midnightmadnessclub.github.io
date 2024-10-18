def generate_html(image_name, num_elements, filter_class):
    html_content = ""
    
    for i in range(1, num_elements + 1):
        html_content += f'''
<div class="col-lg-4 col-md-6 photography-item {filter_class}">
  <div class="photography-wrap">
    <img src="assets/img/photography/MOTD/{image_name} ({i}).webp" class="img-fluid" alt="">
    <div class="photography-links">
      <a href="assets/img/photography/MOTD/{image_name} ({i}).webp" data-gallery="photographyGallery" class="photography-lightbox"><i class="bx bx-plus"></i></a>
      <a href="" title="View Photo"><i class="bx bx-link"></i></a>
    </div>
  </div>
</div>
'''
    return html_content

def save_to_file(content, file_name="output.txt"):
    with open(file_name, "w") as file:
        file.write(content)

if __name__ == "__main__":
    # Ask user for input
    image_name = input("Enter the image name (e.g., MidnightMadnessMistressOfTheDark): ")
    num_elements = int(input("Enter the number of elements: "))
    filter_class = input("Enter the filter class (e.g., filter-12-23): ")

    # Generate HTML content
    html_content = generate_html(image_name, num_elements, filter_class)

    # Save to file
    save_to_file(html_content)

    print(f"HTML content has been written to output.txt")
