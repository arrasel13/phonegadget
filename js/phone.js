const loadPhone = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/phones?search=iphone"
    );
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
  } catch (error) {
    console.error("Something went wrong", error);
  }
};

loadPhone();
