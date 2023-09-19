import React, { Component } from "react";
import Papa from "papaparse";
import html2canvas from "html2canvas";

class Certificate extends Component {
  state = {
    names: [],
    certificates: [],
  };

  handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        const names = result.data.map((row) => row.Name);
        this.setState({ names });
      },
    });
  };

  captureCertificate = (certificateRef, name) => {
    if (certificateRef) {
      html2canvas(certificateRef, { allowTaint: true }).then((canvas) => {
        const image = canvas.toDataURL("image/png");
        this.downloadCertificate(image, name);
      });
    }
  };

  downloadCertificate = (imageData, name) => {
    const link = document.createElement("a");
    link.href = imageData;
    link.download = `${name}_Certificate.png`;
    link.click();
  };

  generateCertificates = () => {
    const certificates = this.state.names.map((name, index) => {
      return (
        <div key={index} className="certificate" ref={(ref) => this.captureCertificate(ref, name)}>
          <p className="name">{name}</p>
          <img
            src="https://i.postimg.cc/7ZnR4Y6R/certificate.jpg"
            alt="Certificate"
          />
        </div>
      );
    });
  //https://i.postimg.cc/7ZnR4Y6R/certificate.jpg image link
    this.setState({ certificates }, () => {
      setTimeout(() => {
        // Generate and download images after certificates are rendered
        this.state.certificates.forEach((certificate, index) => {
          html2canvas(certificate, { allowTaint: true }).then((canvas) => {
            const image = canvas.toDataURL("image/png");
            this.downloadCertificate(image, this.state.names[index]);
          });
        });
      }, 1000); // Adjust the delay time as needed
    });
  };
  

  render() {
    return (
      <div className="App">
        <div className="Meta">
          <h1>Agrivision4U Quiz Certificates</h1>
          <p>Upload a CSV file containing names.</p>
          <input
            type="file"
            accept=".csv"
            onChange={this.handleFileUpload}
          />
          <button onClick={this.generateCertificates}>
            Download Certificates
          </button>
        </div>

        <div className="certificates-container">
          {this.state.certificates.map((certificate, index) => (
            <div key={index} className="certificate">
              {certificate}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Certificate;
