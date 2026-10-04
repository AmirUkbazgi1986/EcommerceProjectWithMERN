import { assets } from "../assets/assets";
import Title from "../components/Title";
import NewsLetterBox from "../components/NewsLetterBox";

function About() {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"About"} text2={"Us"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          alt="image about us"
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Forever was born out of a person for innovation and desire to
            revolutionize the way people shop online. Our journey with a simple
            idea: to provide a platform where customers can easily discover,
            explore, and purchase a wide range of products from the comfort of
            their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to create a diverse
            selection of high-quality products that the cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection source from trusted
            brand and suppliers.
          </p>
          <b>Our Mission</b>
          <p>
            Our mission at Forever is to empower customers with choice, and
            confidence. We've dedicated to providing a seamless shopping
            experience that exceeds expections, from browsing and ordering to
            delivery and beyond.
          </p>
        </div>
      </div>
      <div className="text-xl text-left py-4 ">
        <Title text1={"Why"} text2={"Choose us"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 sm:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>
        <div className="border px-10 sm:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>
        <div className="border px-10 sm:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
}

export default About;
