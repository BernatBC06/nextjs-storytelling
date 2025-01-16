import matplotlib
matplotlib.use('Agg')

import pandas as pd
import matplotlib.pyplot as plt
import os
import io
import base64


def process_csv(file_path):
    file_path = os.path.join(os.path.dirname(__file__), '../data/GamingStudy_data.csv')
    data = pd.read_csv(file_path, encoding='latin1')
    summary = data.describe().to_dict()  # Resumen de estadísticas básicas
    return summary

def create_plot():
    plt.figure(figsize=(10, 6))

      # Datos de ejemplo
    x = [1, 2, 3, 4, 5]
    y = [10, 12, 8, 9, 15]

    # Crear un gráfico simple
    plt.plot(x, y, marker='o')
    plt.title('Ejemplo de Gráfico')
    plt.xlabel('Eje X')
    plt.ylabel('Eje Y')

    # Guardar el gráfico en un buffer
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    plt.close()

    # Convertir el gráfico a una cadena base64
    encoded_img = base64.b64encode(buf.getvalue()).decode('utf-8')
    buf.close()

    return encoded_img
