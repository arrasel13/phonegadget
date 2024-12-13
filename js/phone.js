const loadPhone = async (searchText) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    );
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
  } catch (error) {
    console.error("Something went wrong", error);
  }
};

const displayPhones = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  // console.log(phones);
  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card p-6 border border-[#CFCFCF]";
    phoneCard.innerHTML = `
      <figure class="bg-[#0D6EFD0D] rounded-lg p-6">
          <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
      </figure>
      <div class="flex flex-col items-center text-center mt-6">
          <h2 class="card-title font-poppins font-bold text-2xl text-[#403F3F] mb-4">${phone.phone_name}
          </h2>
          <p class="font-poppins font-normal text-lg text-[#706F6F] mb-2">There are many variations of
              passages of
              available, but the majority have suffered</p>
          <p class="font-poppins font-bold text-lg text-[#403F3F]">$999</p>
          <div class="card-actions mt-6">
              <button class="btn bg-[#0D6EFD] hover:bg-[#0D6EFD] text-white">Show Details</button>
          </div>
      </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
};

// handle search button
const handleSearch = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText);
};
