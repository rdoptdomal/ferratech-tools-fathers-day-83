import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Google } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Se já está logado, redireciona para o admin
    const session = supabase.auth.getSession();
    session.then(({ data }) => {
      if (data.session) {
        navigate("/admin");
      }
    });
  }, [navigate]);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/admin"
      }
    });
    if (error) {
      toast({
        title: "Erro ao autenticar",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Entrar na Área Administrativa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={handleGoogleLogin}
          >
            <Google className="h-5 w-5" />
            Entrar com Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth; 