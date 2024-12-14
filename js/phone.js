const loadPhone = async (searchText = "13", isShowAll) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    );
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
  } catch (error) {
    console.error("Something went wrong", error);
  }
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  if (!isShowAll) {
    // display first 12 phones
    phones = phones.slice(0, 12);
  }

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
              <button onclick="handleShowDetails('${phone.slug}')" class="btn bg-[#0D6EFD] hover:bg-[#0D6EFD] text-white">Show Details</button>
          </div>
      </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });

  toggleLoadingSpinner(false);
};

// handle search button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loadding-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

const handleShowDetails = async (id) => {
  // console.log(id);
  // load Sigle Phone data
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phone/${id}`
    );
    // console.log(res);
    const data = await res.json();
    // console.log(data);
    const phone = data.data;
    // console.log(phone);
    showPhoneDetails(phone);
  } catch (error) {
    console.error("Something went wrong to load single phone info", error);
  }
};

const showPhoneDetails = (phone) => {
  const singlePhoneDetailsContainer = document.getElementById(
    "modal-content-container"
  );
  singlePhoneDetailsContainer.textContent = "";

  const phoneDetails = document.createElement("div");
  phoneDetails.innerHTML = `
      <figure class="bg-[#0D6EFD0D] rounded-lg p-6">
          <img src="${phone?.image}" alt="Shoes" class="rounded-xl">
      </figure>
      <div class="flex flex-col mt-4">
          <h2 class="card-title font-poppins font-bold text-2xl text-[#403F3F] mb-4">${phone?.name}
          </h2>
          <p class="font-poppins font-normal text-lg text-[#706F6F] mb-3">There are many variations of
              passages of
              available, but the majority have suffered</p>
          <p class="font-poppins text-md text-[#403F3F] mb-1">
              <strong>Storage: </strong>
              <span>${phone?.mainFeatures?.storage}</span>
          </p>
          <p class="font-poppins text-md text-[#403F3F] mb-1">
              <strong>Display Size: </strong>
              <span>${phone?.mainFeatures?.displaySize}</span>
          </p>
          <p class="font-poppins text-md text-[#403F3F] mb-1">
              <strong>Chipset: </strong>
              <span>${phone?.mainFeatures?.chipSet}</span>
          </p>
          <p class="font-poppins text-md text-[#403F3F] mb-1">
              <strong>Memory: </strong>
              <span>${phone?.mainFeatures?.memory}</span>
          </p>
          <p class="font-poppins text-md text-[#403F3F] mb-1">
              <strong>Slug: </strong>
              <span>${phone?.slug}</span>
          </p>
          <p class="font-poppins text-md text-[#403F3F] mb-1">
              <strong>Release data: </strong>
              <span>${phone?.releaseDate}</span>
          </p>
          <p class="font-poppins text-md text-[#403F3F] mb-1">
              <strong>Brand: </strong>
              <span>${phone?.brand}</span>
          </p>
          <p class="font-poppins text-md text-[#403F3F]">
              <strong>GPS: </strong>
              <span>${phone?.others?.GPS}</span>
          </p>
      </div> 
  `;
  singlePhoneDetailsContainer.appendChild(phoneDetails);
  // show modal
  show_details_modal.showModal();
};

// Handle show all
const handleShowAll = () => {
  handleSearch(true);
};

loadPhone();
