import React, { useState } from "react";
import { MatchExpression } from "./Regex";

const PasswordStrength = ({ password }) => {
  const [style, setStyle] = useState({
    backgroundColor: "#DDDDDD",
    size: 1,
  });
  const regex = MatchExpression(password);

  if (
    regex.onlyLowerCaseLetters ||
    regex.onlyUpperCaseLetters ||
    regex.onlyNumbers ||
    regex.onlySpecialCharacter ||
    regex.onlyWhiteSpace
  ) {
    setStyle({ backgroundColor: "#ff0000", size: 1 });
  } else if (
    regex.lowerCaseAndUpperCase &&
    !regex.onlyNumbers &&
    !regex.onlySpecialCharacter
  ) {
    setStyle({ backgroundColor: "#99FF00" });
  } else if (regex.min8UpLowNumSpecial) {
    setStyle({ backgroundColor: "#99FF00" });
  }

  //  u VEYA lOWER veya sayi tek cesit red #ff0000 1 bar
  //  U + l orange #ff9900 2 bar
  // Number + U + L  #ffff00  3 bar
  // Number + U + L + special   #99fe00  4 bar
  // Number + U + L + special + 7 karakter    #99fe00  4 bar

  return (
    <div id="strength">
      <small>
        <span>Password strength:</span>
      </small>
      <ul id="strengthBar w-25">
        <li className="point" style={style}></li>
        <li className="point" style={{ backgroundColor: "#99FF00" }}></li>
        <li className="point" style={{ backgroundColor: "#99FF00" }}></li>
        <li className="point" style={{ backgroundColor: "#99FF00" }}></li>
        <li className="point" style={{ backgroundColor: "#DDDDDD" }}></li>
      </ul>
    </div>
  );
};

export default PasswordStrength;
