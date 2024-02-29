CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  fullName VARCHAR(50),
  email VARCHAR(30),
  password VARCHAR(30),
  role varchar(40),
	createdAt date,
	address varchar(50),
	phone varchar(20),
	isActive bool
);


insert into "user" (fullName, email, password, role, createdAt, address, phone, isActive)
values
('Maicol Arroyave', 'maicolaroyave10@gmail.com', 'md532423', 'Admin', '2023-12-01', 'Carrera 77 #20-12', '31223232', true  ),
('David Ramoz', 'ramozcalzada@gmail.com', 'mmdmsmdsm20002sd', 'Admin', '2023-12-01', 'Carrera 77 #20-12', '31223232', true  );


create table typeequipment
(
	id serial primary key not null,
	name character varying(50),
	description text
);

insert into typeequipment ( name, description)
values ('Computador', 'Dispositivo de computo portatil'),
		('Celular', 'Dispositivo Movil'),
		('Tablet', 'Dispositivo Movil');
		
		
create table equipment 
(
	id serial primary key not null,
	name character varying (50),
	description text,
	isBorrowed boolean default false,
	characteristics text,
	idTypeEquipment int,
	foreign key (idTypeEquipment) references typeequipment (id)
);

insert into equipment (name, description, isBorrowed, characteristics, idTypeEquipment)
values
('Portatil lenovo', 'portatil para prestamo', false, '{ram: "8gb", sd: "240gb", color: "Negro"}', 3 );


create table loan
(
	id serial primary key not null,
	startDate timestamp,
	endDate timestamp,
	endRealDate timestamp,
	status text,
	idUser int,
	idEquipment int, 
	foreign key (idUser) references "user" (id),
	foreign key (idEquipment) references equipment(id)
);


insert into loan (startDate, endDate, endRealDate, status, idUser, idEquipment)
values ('2023-12-01', '2023-12-10', '2023-12-15', 'entregado', 1, 1);


create table loanrequest (
	id serial primary key,
	iduser int,
	typeequipment int,
	statusapproved text,
    startdaterequired text, 
	enddaterequired text,
	foreign key typeequipment references typeequipment(id);
);

insert into loanrequest (iduser, typeequipment, statusapproved, startdaterequired, enddaterequired )
values (1, 3, 'pendiente', '2024-02-29', '2024-03-12');


