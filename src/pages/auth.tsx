import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FcGoogle } from "react-icons/fc";
import { ErrorMessage } from "@/components/errorMsg";
import { 
  SigninInputTypes,
  SignupInputTypes
} from "@/types/types";
import axios from "@/utils/axiosClient";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [name, setName] = useState("");
  const [errorMSG, setErrorMSG] = useState<string|null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMSG(null);
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSignup = async () => {
    const formdata = { name, ...form }
    const {success, error} = SignupInputTypes.safeParse(formdata);
    if (!success) {
      setErrorMSG(error.issues[0]?.message);
    }
    const response = await axios.post("/api/v1/player/signup", formdata);    
    const statusCode = response.data.statusCode;
    console.log(response.data);
    
    if(statusCode==201) {
      setErrorMSG(response?.data?.message);
    } else {
      navigate("/cashflow/eqip/view-data");
    }
    
  };

  const handleSignin = async () => {
    const {success, error} = SigninInputTypes.safeParse(form);
    if (!success) {
      setErrorMSG(error.issues[0]?.message);
    }
    const response = await axios.post("/api/v1/player/signin", form);
    const statusCode = response.data.statusCode;

    if(statusCode!==201) {
      setErrorMSG(response?.data?.message);
    } else {
      navigate("/cashflow/eqip/view-data");
    }
    
  };

  const handleGoogleLogin = () => {
    console.log("Google login triggered");
    window.location.href = "https://karnival-kings-server.onrender.com/auth/google"
  };

  return (
    <div className="min-h-[550px] md:min-h-[500px]  flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 rounded-2xl shadow-lg">
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <div className="space-y-4">
                <Input
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                />
                <Button className="w-full" onClick={handleSignin}>Sign In</Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleGoogleLogin}
                >
                  <FcGoogle size={20} /> Sign in with Google
                </Button>
                {
                  errorMSG ? <>
                  <ErrorMessage message={errorMSG}/>
                  </>:<></>
                }
              </div>
            </TabsContent>

            <TabsContent value="signup">
              <div className="space-y-4">
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    setErrorMSG(null);
                    setName(e.target.value)
                  }}
                />
                <Input
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                />
                <Button className="w-full" onClick={handleSignup}>Sign Up</Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleGoogleLogin}
                >
                  <FcGoogle size={20} /> Sign up with Google
                </Button>
                {
                  errorMSG ? <>
                  <ErrorMessage message={errorMSG}/>
                  </>:<></>
                }
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
