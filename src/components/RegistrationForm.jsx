import React, { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { BookOpen, Check, User } from "lucide-react";
import { data } from "autoprefixer";

const RegistrationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    superintendence: "",
    position: "",
    gender: "",
    maritalStatus: "",
    address: {
      street: "",
      number: "",
      neighborhood: "",
      complement: "",
      city: "",
      state: "",
      zipCode: "",
    },
    username: "",
    password: "",
  });

  const [formStep, setFormStep] = useState(0);
  const [errors, setErrors] = useState({});

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [isSubmitting, setSubmitting] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const convertDate = (data) => {
    if (!data) {
      return "";
    }

    var array = data.split("-");
    if (array.length < 3) {
      return "";
    }

    var year = array[0];
    var month = array[1];
    var day = array[2];

    return `${day}/${month}/${year}`;
  };

  const sheetUrl =
    "https://script.google.com/macros/s/AKfycbx6JyT6sHqkghFVwYHxIFsrErY1VlT5FtEBCcsSHXfkYJgfbs5ujyzNxBl5l54xmtc1HQ/exec";

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 0) {
      if (!formData.fullName.trim())
        newErrors.fullName = "Nome completo é obrigatório";
      if (!formData.birthDate)
        newErrors.birthDate = "Data de nascimento é obrigatória";
      if (!formData.position)
        newErrors.position = "a função eclesiástica é obrigatória";
      if (!formData.superintendence)
        newErrors.superintendence = "a superintendência é obrigatória";
      if (!formData.gender) newErrors.gender = "Sexo é obrigatório";
      if (!formData.maritalStatus)
        newErrors.maritalStatus = "Estado civil é obrigatório";
    } else if (step === 1) {
      if (!formData.address.street.trim())
        newErrors["address.street"] = "Rua é obrigatória";
      if (!formData.address.number.trim())
        newErrors["address.number"] = "Número é obrigatório";
      if (!formData.address.neighborhood.trim())
        newErrors["address.neighborhood"] = "Bairro é obrigatório";
      if (!formData.address.city.trim())
        newErrors["address.city"] = "Cidade é obrigatória";
      if (!formData.address.state.trim())
        newErrors["address.state"] = "Estado é obrigatório";
      if (!formData.address.zipCode.trim())
        newErrors["address.zipCode"] = "CEP é obrigatório";
    } else if (step === 2) {
      if (!formData.username.trim())
        newErrors.username = "Nome de usuário é obrigatório";
      else if (formData.username.length < 4)
        newErrors.username = "Nome de usuário deve ter pelo menos 4 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(formStep)) {
      setFormStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setFormStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateStep(formStep)) {
      // Save to localStorage

      var url = sheetUrl + "?action=Create";
      url += `&fullName=${formData.fullName}`;
      url += `&birthDate=${convertDate(formData.birthDate)}`;
      url += `&superintendence=${formData.superintendence}`;
      url += `&position=${formData.position}`;
      url += `&gender=${formData.gender}`;
      url += `&maritalStatus=${formData.maritalStatus}`;
      url += `&street=${formData.address.street}`;
      url += `&number=${formData.address.number}`;
      url += `&neighborhood=${formData.address.neighborhood}`;
      url += `&complement=${formData.address.complement}`;
      url += `&city=${formData.address.city}`;
      url += `&state=${formData.address.state}`;
      url += `&zipCode=${formData.address.zipCode}`;
      url += `&username=${formData.username}`;
      url += `&password=${formData.password}`;

      setSubmitting(true);

      fetch(url, {
        method: "GET",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Erro na requisição");
          }
          return res.json();
        })
        .then(() => {
          toast({
            title: "Pré-Inscrição realizada com sucesso!",
            description:
              "Sua pré-inscrição para o curso de teologia foi recebida.",
            duration: 5000,
          });
        })
        .catch((error) => {
          console.error("Erro:", error);
          toast({
            title: "Erro ao realizar pré-inscrição.",
            description: "Contate Rodrigo Lima em 84 98153-0203.",
            duration: 600000,
          });
        })
        .finally(() => {
          setSubmitting(false);
          // Reset form
          setFormData({
            fullName: "",
            birthDate: "",
            position: "",
            superintendence: "",
            gender: "",
            maritalStatus: "",
            address: {
              street: "",
              number: "",
              complement: "",
              neighborhood: "",
              city: "",
              state: "",
              zipCode: "",
            },
            username: "",
            password: "",
          });
          setFormStep(0);
        });
    }
    // Show success message
  };

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
  };

  return (
    <Card className="w-full max-w-3xl mx-auto form-container">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center"
          >
            <BookOpen className="h-8 w-8 text-primary" />
          </motion.div>
        </div>
        <CardTitle className="text-center text-3xl font-bold">
          Pré-inscrição para Curso de Teologia
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {formStep === 0 && (
            <motion.div
              key="step1"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Digite seu nome completo"
                  className={errors.fullName ? "border-destructive" : ""}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName}</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de Nascimento</Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className={errors.birthDate ? "border-destructive" : ""}
                  />
                  {errors.birthDate && (
                    <p className="text-sm text-destructive">
                      {errors.birthDate}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Superintendencia</Label>
                  <Select
                    id="superintendence"
                    name="superintendence"
                    value={formData.superintendence}
                    onChange={handleChange}
                    className={errors.position ? "border-destructive" : ""}
                  >
                    <option value="">Selecione</option>
                    <option value="AC-A">AC-A</option>
                    <option value="AC-B">AC-B</option>
                    <option value="AM">AM</option>
                    <option value="CE">CE</option>
                    <option value="MG-A">MG-A</option>
                    <option value="MG-C">MG-C</option>
                    <option value="PR">PR</option>
                    <option value="RJ-A">RJ-A</option>
                    <option value="RJ-B">RJ-B</option>
                    <option value="RJ-C">RJ-C</option>
                    <option value="RJ-D">RJ-D</option>
                    <option value="RN">RN</option>
                    <option value="RO">RO</option>
                    <option value="RS">RS</option>
                    <option value="SP-C">SP-C</option>
                  </Select>
                  {errors.superintendence && (
                    <p className="text-sm text-destructive">
                      {errors.superintendence}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Função eclesiástica</Label>
                  <Select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className={errors.position ? "border-destructive" : ""}
                  >
                    <option value="">Selecione</option>
                    <option value="bispo">Bispo</option>
                    <option value="pastor">Pastor</option>
                    <option value="evangelista">Evangelista</option>
                    <option value="presbítero">Presbítero</option>
                    <option value="pregador-de-conferencia">
                      Pregador(a) de Conferência
                    </option>
                    <option value="diácono">Diácono(a)</option>
                    <option value="obreiro">Obreiro(a)</option>
                  </Select>
                  {errors.position && (
                    <p className="text-sm text-destructive">
                      {errors.position}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Sexo</Label>
                  <Select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={errors.gender ? "border-destructive" : ""}
                  >
                    <option value="">Selecione</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                  </Select>
                  {errors.gender && (
                    <p className="text-sm text-destructive">{errors.gender}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maritalStatus">Estado Civil</Label>
                  <Select
                    id="maritalStatus"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    className={errors.maritalStatus ? "border-destructive" : ""}
                  >
                    <option value="">Selecione</option>
                    <option value="solteiro">Solteiro(a)</option>
                    <option value="casado">Casado(a)</option>
                    <option value="divorciado">Divorciado(a)</option>
                    <option value="viuvo">Viúvo(a)</option>
                  </Select>
                  {errors.maritalStatus && (
                    <p className="text-sm text-destructive">
                      {errors.maritalStatus}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {formStep === 1 && (
            <motion.div
              key="step2"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-4"
            >
              <h3 className="text-lg font-medium">Endereço</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="street">Rua</Label>
                  <Input
                    id="street"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    placeholder="Nome da rua"
                    className={
                      errors["address.street"] ? "border-destructive" : ""
                    }
                  />
                  {errors["address.street"] && (
                    <p className="text-sm text-destructive">
                      {errors["address.street"]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="number">Número</Label>
                  <Input
                    id="number"
                    name="address.number"
                    value={formData.address.number}
                    onChange={handleChange}
                    placeholder="Nº"
                    className={
                      errors["address.number"] ? "border-destructive" : ""
                    }
                  />
                  {errors["address.number"] && (
                    <p className="text-sm text-destructive">
                      {errors["address.number"]}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="complement">Complemento</Label>
                  <Input
                    id="complement"
                    name="address.complement"
                    value={formData.address.complement}
                    onChange={handleChange}
                    placeholder="Complemento"
                    className={
                      errors["address.complement"] ? "border-destructive" : ""
                    }
                  />
                  {errors["address.complement"] && (
                    <p className="text-sm text-destructive">
                      {errors["address.complement"]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input
                    id="neighborhood"
                    name="address.neighborhood"
                    value={formData.address.neighborhood}
                    onChange={handleChange}
                    placeholder="Bairro"
                    className={
                      errors["address.neighborhood"] ? "border-destructive" : ""
                    }
                  />
                  {errors["address.neighborhood"] && (
                    <p className="text-sm text-destructive">
                      {errors["address.neighborhood"]}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Select
                    id="state"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                    className={
                      errors["address.state"] ? "border-destructive" : ""
                    }
                  >
                    <option value="">Selecione</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </Select>
                  {errors["address.state"] && (
                    <p className="text-sm text-destructive">
                      {errors["address.state"]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    placeholder="Cidade"
                    className={
                      errors["address.city"] ? "border-destructive" : ""
                    }
                  />
                  {errors["address.city"] && (
                    <p className="text-sm text-destructive">
                      {errors["address.city"]}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipCode">CEP</Label>
                <Input
                  id="zipCode"
                  name="address.zipCode"
                  value={formData.address.zipCode}
                  onChange={handleChange}
                  placeholder="00000-000"
                  className={
                    errors["address.zipCode"] ? "border-destructive" : ""
                  }
                />
                {errors["address.zipCode"] && (
                  <p className="text-sm text-destructive">
                    {errors["address.zipCode"]}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {formStep === 2 && (
            <motion.div
              key="step3"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-4"
            >
              <div className="flex items-center justify-center mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center"
                >
                  <User className="h-8 w-8 text-primary" />
                </motion.div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Nome de Usuário</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Escolha um nome de usuário"
                  className={errors.username ? "border-destructive" : ""}
                />
                {errors.username && (
                  <p className="text-sm text-destructive">{errors.username}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  Este será seu nome de usuário para acessar o sistema do curso.
                </p>
              </div>

              <div className="space-y-2">
                <div className="password-input">
                  <Label htmlFor="password">Senha</Label>
                  <div
                    className="input-wrapper"
                    style={{ position: "relative" }}
                  >
                    <Input
                      id="password"
                      name="password"
                      value={formData.password}
                      type={passwordVisible ? "text" : "password"}
                      className="input"
                      placeholder="coloque sua senha"
                      onChange={handleChange}
                      // style={{
                      //   paddingRight: "2.5rem", // Space for the icon
                      // }}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="toggle-button"
                      style={{
                        position: "absolute",
                        right: "0.5rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                      aria-label={
                        passwordVisible ? "Hide password" : "Show password"
                      }
                    ></button>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                <h4 className="font-medium mb-2">Resumo da Inscrição</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <span className="font-medium">Nome:</span>{" "}
                    {formData.fullName}
                  </li>
                  <li>
                    <span className="font-medium">Data de Nascimento:</span>{" "}
                    {convertDate(formData.birthDate)}
                  </li>
                  <li>
                    <span className="font-medium">Sexo:</span> {formData.gender}
                  </li>
                  <li>
                    <span className="font-medium">Estado Civil:</span>{" "}
                    {formData.maritalStatus}
                  </li>
                  <li>
                    <span className="font-medium">Endereço:</span>{" "}
                    {formData.address.street}, {formData.address.number},{" "}
                    {formData.address.neighborhood}, {formData.address.city} -{" "}
                    {formData.address.state}, CEP: {formData.address.zipCode}
                  </li>
                </ul>
              </div>
            </motion.div>
          )}

          <div className="flex justify-between mt-8">
            {formStep > 0 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                Voltar
              </Button>
            )}

            {formStep < 2 ? (
              <Button type="button" className="ml-auto" onClick={nextStep}>
                Próximo
              </Button>
            ) : (
              <Button
                type="submit"
                className="ml-auto bg-gradient-to-r from-primary to-primary/80 sb-btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "10px 20px",
                  backgroundColor: isSubmitting ? "#ccc" : "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                }}
              >
                {isSubmitting ? (
                  <span
                    style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid #fff",
                      borderTop: "2px solid transparent",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                ) : (
                  "Finalizar Pré Inscrição"
                )}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-6">
        <div className="flex space-x-2">
          {[0, 1, 2].map((step) => (
            <motion.div
              key={step}
              className={`w-3 h-3 rounded-full ${
                formStep === step ? "bg-primary" : "bg-primary/30"
              }`}
              animate={{
                scale: formStep === step ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: formStep === step ? Infinity : 0,
                repeatDelay: 1,
              }}
            />
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegistrationForm;
