import Atropos from "atropos/react";
import "atropos/css";

export default function AtroposContainer({ children, className = "" }) {
  return (
    <Atropos
      className={className}
      shadow={false} // Desactiva la sombra
      highlight={true} // Activa el resaltado
      rotate={true} // Activa la rotación
      rotateXMax={25} // Mayor inclinación en X
      rotateYMax={25} // Mayor inclinación en Y
      activeOffset={60} // Profundidad del efecto
        scale={1.05} // Escala ligeramente el contenido
    >
      {children}
    </Atropos>
  );
}