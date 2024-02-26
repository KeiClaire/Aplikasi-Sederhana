import React, { useState } from 'react';

function formatRupiah(angka) {
  var number_string = angka.toString(),
    split = number_string.split(','),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi),
    separator;

  if (ribuan) {
    separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
  return 'Rp' + rupiah;
}

function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const addItem = () => {
    if (itemName && itemPrice) {
      const newItem = {
        id: items.length + 1,
        name: itemName,
        price: parseFloat(itemPrice)
      };
      setItems([...items, newItem]);
      setItemName('');
      setItemPrice('');
    } else {
      alert('Mohon masukkan nama dan harga item!');
    }
  };

  const removeItem = id => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  const calculateTotal = () => {
    let total = 0;
    items.forEach(item => {
      total += item.price;
    });
    return total.toFixed(0);
  };

  return (
    <div className="app">
      <h2><center>🛍️ Kei Store 🛒</center></h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Barang"
          value={itemName}
          onChange={e => setItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Harga"
          value={itemPrice}
          onChange={e => setItemPrice(e.target.value)}
        />
        <button className="add-button" onClick={addItem}>Beli</button>
      </div>
      <div className="list-container">
        <h3>Daftar Belanja:</h3>
        <ul>
          {items.map(item => (
            <li key={item.id} className="item">
              <span>{item.name} - {formatRupiah(item.price.toFixed(0))}</span>
              <button className="remove-button" onClick={() => removeItem(item.id)}>Batal</button>
            </li>
          ))}
        </ul>
        <h3>Total: {formatRupiah(calculateTotal())}</h3>
      </div>
    </div>
  );
}

export default App;