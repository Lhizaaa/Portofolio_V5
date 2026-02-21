import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import { Link } from "react-router-dom";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: 'Mengirim Pesan...',
      html: 'Harap tunggu selagi kami mengirim pesan Anda',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      // Ganti dengan email Anda di FormSubmit
      const formSubmitUrl = 'https://formsubmit.co/ekizulfarrachman@gmail.com';
      
      // Siapkan data form untuk FormSubmit
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('message', formData.message);
      submitData.append('_subject', 'Pesan Baru dari Website Portfolio');
      submitData.append('_captcha', 'false'); // Nonaktifkan captcha
      submitData.append('_template', 'table'); // Format email sebagai tabel

      await axios.post(formSubmitUrl, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

     
      Swal.fire({
        title: 'Berhasil!',
        text: 'Pesan Anda telah berhasil terkirim!',
        icon: 'success',
        confirmButtonColor: '#3b82f6',
        timer: 2000,
        timerProgressBar: true
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {
      if (error.request && error.request.status === 0) {
        Swal.fire({
          title: 'Berhasil!',
          text: 'Pesan Anda telah berhasil terkirim!',
          icon: 'success',
          confirmButtonColor: '#3b82f6',
          timer: 2000,
          timerProgressBar: true
        });

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        Swal.fire({
          title: 'Gagal!',
          text: 'Terjadi kesalahan. Silakan coba lagi nanti.',
          icon: 'error',
          confirmButtonColor: '#3b82f6'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-3 sm:px-[5%] lg:px-[10%]" >
      <div className="text-center lg:mt-[5%] mt-6 sm:mt-10 mb-2 sm:px-0 px-2">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#0ea5e9]"
        >
          <span
            style={{
              color: "#3b82f6",
              backgroundImage:
                "linear-gradient(45deg, #3b82f6 10%, #0ea5e9 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Hubungi Saya
          </span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-2 px-2"
        >
          Punya pertanyaan? Kirimi saya pesan, dan saya akan segera membalasnya.
        </p>
      </div>

      <div
        className="h-auto py-6 sm:py-10 flex items-center justify-center 2xl:pr-[3.1%] lg:pr-[3.8%] md:px-0"
        id="Contact"
      >
        <div className="container px-2 sm:px-[1%] grid grid-cols-1 lg:grid-cols-[45%_55%] gap-6 sm:gap-12" >
          <div
        
            className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-5 md:p-10 transform transition-all duration-500 hover:shadow-[#3b82f6]/10"
          >
            <div className="flex justify-between items-start mb-6 sm:mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#0ea5e9]">
                  Hubungi
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-400">
                  Ada yang ingin didiskusikan? Kirim saya pesan dan mari kita bicara.
                </p>
              </div>
              <Share2 className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#3b82f6] opacity-50 flex-shrink-0" />
            </div>

            <form 
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-6"
            >
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="relative group"
              >
                <User className="absolute left-3 sm:left-4 top-3 sm:top-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-[#3b82f6] transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Nama Anda"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-3 sm:p-4 pl-10 sm:pl-12 bg-white/10 rounded-lg sm:rounded-xl border border-white/20 placeholder-gray-500 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 transition-all duration-300 hover:border-[#3b82f6]/30 disabled:opacity-50"
                  required
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="relative group"
              >
                <Mail className="absolute left-3 sm:left-4 top-3 sm:top-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-[#3b82f6] transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Anda"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-3 sm:p-4 pl-10 sm:pl-12 bg-white/10 rounded-lg sm:rounded-xl border border-white/20 placeholder-gray-500 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 transition-all duration-300 hover:border-[#3b82f6]/30 disabled:opacity-50"
                  required
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="relative group"
              >
                <MessageSquare className="absolute left-3 sm:left-4 top-3 sm:top-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-[#3b82f6] transition-colors" />
                <textarea
                  name="message"
                  placeholder="Pesan Anda"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full resize-none p-3 sm:p-4 pl-10 sm:pl-12 bg-white/10 rounded-lg sm:rounded-xl border border-white/20 placeholder-gray-500 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 transition-all duration-300 hover:border-[#3b82f6]/30 h-32 sm:h-40 disabled:opacity-50"
                  required
                />
              </div>
              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#3b82f6] to-[#0ea5e9] text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#3b82f6]/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>

            <div className="mt-6 sm:mt-10 pt-4 sm:pt-6 border-t border-white/10 flex justify-center space-x-4 sm:space-x-6">
              <SocialLinks />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-10 md:py-8 shadow-2xl transform transition-all duration-500 hover:shadow-[#3b82f6]/10">
            <Komentar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;